"use client"

import * as React from "react"
import {
  Calculator,
  Calendar,
  Smile,
} from "lucide-react"

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
import { Button } from "@/components/ui/button"

const cats = ["Siamese", "British Shorthair", "Maine Coon", "Persian", "Ragdoll", "Sphynx"]
const dogs = ["German Shepherd", "Bulldog", "Labrador Retriever", "Golden Retriever", "French Bulldog", "Siberian Husky"]

interface ResultItem {
  id: string;
  name: string;
}

export function SearchDialog() {
  const [open, setOpen] = React.useState(false)
  const [searching, setSearching] = React.useState(false)
  const [commandInput, setCommandInput] = React.useState<string>("")
  const [results, setResults] = React.useState<ResultItem[]>([]);


  React.useEffect(() => {
    searchTokens(commandInput)
  }, [commandInput])

  // const mockApiSearch = (searchQuery: string): string[] => {
  //   setSearching(true)
  //   const lookingForCats = searchQuery.includes("cat")
  //   const lookingForDogs = searchQuery.includes("dog")
  //   if (lookingForCats && lookingForDogs) {
  //     setSearching(false)
  //     return [...cats, ...dogs]
  //   }
  //   if (lookingForCats) {
  //     setSearching(false)
  //     return cats
  //   }
  //   if (lookingForDogs) {
  //     setSearching(false)
  //     return dogs
  //   }
  //   setSearching(false)
  //   return []
  // }

  const handleResultClick = (id: string) => {
    console.log("Clicked result ID:", id);
    setOpen(false);
    // Add any additional logic you need to handle after clicking the item
  }

  const searchTokens = (searchQuery: string) => {
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-xoH5ZX6EqaDUEtUduG4HJR49'}
    };
    setSearching(true)
    fetch(`https://api.coingecko.com/api/v3/search?query=${searchQuery}`, options)
    .then(response => {
      response.json()
      .then(data => {
        console.log(data.coins);
        setResults(data.coins);
        setSearching(false)
      })
    })
    .catch(err => {
      setSearching(false)
      console.error(err)
    });
  }

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
            <CommandItem>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Ethereum</span>
            </CommandItem>
            <CommandItem>
              <Smile className="mr-2 h-4 w-4" />
              <span>Arbitrum</span>
            </CommandItem>
            <CommandItem>
              <Calculator className="mr-2 h-4 w-4" />
              <span>Optimism</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup>
            {results.map((result: ResultItem) => (
              <CommandItem 
                key={result.id} 
                value={result.name} 
                onClick={() => handleResultClick(result.id)}>
                {result.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}