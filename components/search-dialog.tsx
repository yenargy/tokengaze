"use client"

import * as React from "react"
import debounce from 'lodash.debounce'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import type { Token } from '@/types/token'
import { Search } from "lucide-react"
import { COINGECKO_API_OPTIONS, COINGECKO_API_URL, SUGGESTED_TOKENS } from "@/config/constants"

interface SearchDialogProps {
  onResultClick: (id: Token) => void;
}

export const SearchDialog: React.FC<SearchDialogProps> = ({ onResultClick }) => {
  const [open, setOpen] = React.useState(false)
  const [searching, setSearching] = React.useState(false)
  const [commandInput, setCommandInput] = React.useState<string>("")
  const [results, setResults] = React.useState<Token[]>([])
  const [erc20Tokens, setErc20Tokens] = React.useState<Token[]>([])

  // Fetching erc20Tokens on mount
  React.useEffect(() => {
    fetchErc20Tokens();
  }, []);

  // function to fetch erc20Tokens using coinGecko API or from LocalStorage
  const fetchErc20Tokens = () => {
    const storedTokens = localStorage.getItem('erc20Tokens');
    if (storedTokens) {
      setErc20Tokens(JSON.parse(storedTokens));
      setSearching(false);
      return;
    }

    setSearching(true);
    fetch(`${COINGECKO_API_URL}/list?include_platform=true`, COINGECKO_API_OPTIONS)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const erc20Tokens: Token[] = data.filter((token: Token) => token.platforms?.ethereum);
        localStorage.setItem('erc20Tokens', JSON.stringify(erc20Tokens));
        setErc20Tokens(erc20Tokens);
        setSearching(false);
      })
      .catch(err => {
        console.error(err);
        setSearching(false);
      });
  };

  // Define the searchTokens function
  const searchTokens = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }
    const filteredResults = erc20Tokens.filter((token: Token) =>
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearching(false);
    setResults(filteredResults);
  };

  // Wrap searchTokens with debounce to avoid unnecessary re-renders
  const debouncedSearchTokens = React.useCallback(debounce(searchTokens, 250), [erc20Tokens]);

  // Using debouncedSearchTokens to search for tokens on input
  React.useEffect(() => {
    if (commandInput) {
      setSearching(true);
      debouncedSearchTokens(commandInput);
    } else {
      setResults([]);
    }
  }, [commandInput, debouncedSearchTokens])


  // Listening for keyboard events to open the dialog
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const onTokenClick = (result: Token) => {
    onResultClick(result); 
    setOpen(false)
  }

  return (
    <>
      <Button
        variant="outline"
        className="relative h-12 w-full justify-start items-center bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <span className="hidden lg:inline-flex">Search ERC-20 tokens...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Start typing an erc-20 token..." value={commandInput} onValueChange={setCommandInput}/>
        <CommandList>
          <CommandEmpty>{ searching ? "Searching...": "No results found." }</CommandEmpty>
          <CommandGroup heading="Suggestions">
          {SUGGESTED_TOKENS.map((token) => (
            <CommandItem
              key={token.name}
              value={token.name}
              onSelect={() => {onTokenClick(token)}}>
              <Image
                alt={token.name}
                className="aspect-square rounded-3xl object-cover mr-2"
                height="32"
                src={token.image}
                width="32"
              />
              <span>{token.name}</span>
              <span className="text-xs pl-2 opacity-20">{token.symbol.toUpperCase()}</span>
              <kbd className="pointer-events-none absolute right-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-20 sm:flex">
                <span className="text-xs">↵</span>
              </kbd>
            </CommandItem>
          ))}
          </CommandGroup>
            <CommandGroup>
              {results.map(result => (
                <CommandItem 
                  key={result.id} 
                  value={result.name} 
                  onSelect={() => {onTokenClick(result)}}>
                  <span>{result.name}</span>
                  <span className="text-xs pl-2 opacity-20">{result.symbol.toUpperCase()}</span>
                  <kbd className="pointer-events-none absolute right-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-20 sm:flex">
                    <span className="text-xs">↵</span>
                  </kbd>
                </CommandItem>
              ))}
            </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}