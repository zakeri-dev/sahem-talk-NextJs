'use client'

import { ChatLayout } from '@/components/chat/chat-layout'
import { Dialog, DialogDescription, DialogHeader, DialogTitle, DialogContent } from '@/components/ui/dialog'
import UsernameForm from '@/components/username-form'
import { generateUUID } from '@/lib/utils'
import React from 'react'
import useChatStore from '../../stores/useChatStore'

export default function Home() {
  const id = generateUUID()
  const [open, setOpen] = React.useState(false)
  const userName = useChatStore(state => state.userName)
  const setUserName = useChatStore(state => state.setUserName)

  const onOpenChange = (isOpen: boolean) => {
    if (userName) return setOpen(isOpen)

    setUserName('ناشناس')
    setOpen(isOpen)
  }

  return (
    <main className='flex h-[calc(100dvh)] flex-col items-center '>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <ChatLayout key={id} id={id} initialMessages={[]} navCollapsedSize={10} defaultLayout={[30, 160]} />
        <DialogContent className='flex flex-col space-y-4'>
          <DialogHeader className='space-y-2'>
            <DialogTitle>به دانا خوش امدید!</DialogTitle>
            <DialogDescription>نام خود را وارد کنید</DialogDescription>
            <UsernameForm setOpen={setOpen} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main>
  )
}
