"use client"

import * as React from "react"
import {
  Calculator,
  Calendar,
  Smile,
} from "lucide-react"
import debounce from 'lodash.debounce';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const cats = ["Siamese", "British Shorthair", "Maine Coon", "Persian", "Ragdoll", "Sphynx"]
const dogs = ["German Shepherd", "Bulldog", "Labrador Retriever", "Golden Retriever", "French Bulldog", "Siberian Husky"]

interface ResultItem {
  id: string;
  name: string;
  thumb: string;
  large: string;
}

interface Token {
  id: string;
  name: string;
  platforms: {
    ethereum: string;
  };
  symbol: string;
}

interface SearchDialogProps {
  onResultClick: (id: Token) => void;
}

const suggestedTokens = [
  {
    id: 'pepe',
    name: 'Pepe',
    platforms: {
      ethereum: "0x6982508145454ce325ddbe47a25d4ec3d2311933"
    },
    symbol: 'pepe'
  },
  {
    id: 'shiba-inu',
    name: 'Shiba Inu',
    platforms: {
      ethereum: "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce"
    },
    symbol: 'shib'
  },
  {
    id: 'arbitrum',
    name: 'Arbitrum',
    platforms: {
      ethereum: "0xb50721bcf8d664c30412cfbc6cf7a15145234ad1"
    },
    symbol: 'arb'
  }

]


export const SearchDialog: React.FC<SearchDialogProps> = ({ onResultClick }) => {
  const [open, setOpen] = React.useState(false)
  const [searching, setSearching] = React.useState(false)
  const [commandInput, setCommandInput] = React.useState<string>("")
  const [results, setResults] = React.useState<Token[]>([]);
  const [erc20Tokens, setErc20Tokens] = React.useState<Token[]>([]);
  const erc20TokensRef = React.useRef(erc20Tokens);

  // Fetching erc20Tokens on mount
  React.useEffect(() => {
    fetchErc20Tokens();
  }, []);

  // Using ref to always get the latest erc20Tokens in searchTokens
  React.useEffect(() => {
    erc20TokensRef.current = erc20Tokens;
  }, [erc20Tokens]);

  // function to fetch erc20Tokens using coinGecko API
  const fetchErc20Tokens = () => {
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-xoH5ZX6EqaDUEtUduG4HJR49'}
    };
    setSearching(true)
    fetch('https://api.coingecko.com/api/v3/coins/list?include_platform=true', options)
    .then(response => {
      response.json()
      .then(data => {
        console.log(data);
        const erc20Tokens: Token[] = data.filter((token: Token) => token.platforms?.ethereum);
        setErc20Tokens(erc20Tokens);
      })
    })
    .catch(err => {
      console.error(err)
    });
  }

  // Define the searchTokens function
  const searchTokens = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setSearching(false);
      return;
    }
    setSearching(true);
    const filteredResults = erc20TokensRef.current.filter((token: Token) =>
      token.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setResults(filteredResults);
    setSearching(false);
  };

  // Wrap searchTokens with debounce to avoid unnecessary re-renders
  const debouncedSearchTokens = React.useCallback(debounce(searchTokens, 500), []);

  // Using debouncedSearchTokens to search for tokens on input
  React.useEffect(() => {
    if (commandInput) {
      console.log('going in here');
      debouncedSearchTokens(commandInput);
    } else {
      console.log('setting to 0');
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

  return (
    <>
      <Button
        variant="outline"
        className="relative h-12 w-full justify-start items-center bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12"
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex">Search tokens...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Seach for a token name..." value={commandInput} onValueChange={setCommandInput}/>
        <CommandList>
          <CommandEmpty>{ searching ? "Searching...": "No results found." }</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem
              key='pepe' 
              value='pepe'
              onSelect={() => onResultClick(suggestedTokens[0])}>
              <Image
                alt='ethereum'
                className="aspect-square rounded-3xl object-cover mr-2"
                height="32"
                src='https://assets.coingecko.com/coins/images/29850/large/pepe-token.jpeg'
                width="32"
              />
              <span>Pepe</span>
              <kbd className="pointer-events-none absolute right-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-20 sm:flex">
                <span className="text-xs">↵</span>
              </kbd>
            </CommandItem>
            <CommandItem
              key='shiba' 
              value='shiba'
              onSelect={() => onResultClick(suggestedTokens[1])}>
              <Image
                alt='arbitrium'
                className="aspect-square rounded-3xl object-cover mr-2"
                height="32"
                src="https://assets.coingecko.com/coins/images/11939/large/shiba.png"
                width="32"
              />
              <span>Shiba Inu</span>
              <kbd className="pointer-events-none absolute right-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-20 sm:flex">
                <span className="text-xs">↵</span>
              </kbd>
            </CommandItem>
            <CommandItem
              key='arbitrum' 
              value='arbitrum'
              onSelect={() => onResultClick(suggestedTokens[2])}>
              <Image
                alt='optimism'
                className="aspect-square rounded-3xl object-cover mr-2"
                height="32"
                src="https://assets.coingecko.com/coins/images/16547/large/photo_2023-03-29_21.47.00.jpeg"
                width="32"
              />
              <span>Arbitrum</span>
              <kbd className="pointer-events-none absolute right-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-20 sm:flex">
                <span className="text-xs">↵</span>
              </kbd>
            </CommandItem>
          </CommandGroup>
            <CommandGroup>
              {results.map(result => (
                <CommandItem 
                  key={result.id} 
                  value={result.name} 
                  onSelect={() => onResultClick(result)}>
                  {/* <Image
                    alt={result.name}
                    className="aspect-square rounded-3xl object-cover mr-2"
                    height="32"
                    src={result.large}
                    width="32"
                  /> */}
                  <span>{result.name}</span>
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