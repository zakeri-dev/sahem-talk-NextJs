'use client'

import React, { useEffect } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

import { Button } from '../ui/button'
import { CaretSortIcon, HamburgerMenuIcon } from '@radix-ui/react-icons'
import { Sidebar } from '../sidebar'
import { Message } from 'ai/react'
import { getSelectedModel } from '@/lib/model-helper'
import useChatStore from '@/stores/useChatStore'

interface ChatTopbarProps {
  isLoading: boolean
  chatId?: string
  messages: Message[]
  setMessages: (messages: Message[]) => void
}

export default function ChatTopbar({ isLoading, chatId, messages, setMessages }: ChatTopbarProps) {
  const [models, setModels] = React.useState<string[]>([process.env.NEXT_PUBLIC_OLLAMA_MODELS1,process.env.NEXT_PUBLIC_OLLAMA_MODELS2])
  const [open, setOpen] = React.useState(false)
  const [sheetOpen, setSheetOpen] = React.useState(false)
  const selectedModel = useChatStore(state => state.selectedModel)
  const setSelectedModel = useChatStore(state => state.setSelectedModel)

  // useEffect(() => {
  //   const fetchModels = async () => {
  //     const fetchedModels = await fetch('/api/tags')
  //     if (!fetchedModels.ok) {
  //       console.error('Failed to fetch models')
  //       return
  //     }
  //     const json = await fetchedModels.json()
  //     const apiModels = json.models.map((model: any) => model.name)
  //     setModels([...apiModels])
  //   }
  //   fetchModels()
  // }, [])

  const handleModelChange = (model: string) => {
    setSelectedModel(model)
    setOpen(false)
  }

  const handleCloseSidebar = () => {
    setSheetOpen(false)
  }

  return (
    <div className='w-full flex px-4 py-6 items-center justify-between lg:justify-center '>
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger>
          <HamburgerMenuIcon className='lg:hidden w-5 h-5' />
        </SheetTrigger>
        <SheetContent side='right'>
          <Sidebar
            chatId={chatId || ''}
            isCollapsed={false}
            isMobile={false}
            messages={messages}
            closeSidebar={handleCloseSidebar}
          />
        </SheetContent>
      </Sheet>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            disabled={isLoading}
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='w-[300px] justify-between'
          >
            {selectedModel || 'انتخاب پاسخگو'}
            <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[300px] p-1'>
          {models.length > 0 ? (
            models.map(model => (
              <Button
                key={model}
                variant='ghost'
                className='w-full'
                onClick={() => {
                  handleModelChange(model)
                }}
              >
                {model}
              </Button>
            ))
          ) : (
            <Button variant='ghost' disabled className=' w-full'>
              No models available
            </Button>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}
