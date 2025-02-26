'use client'

import Link from 'next/link'
import { MoreHorizontal, SquarePen, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { Message } from 'ai/react'
import Image from 'next/image'
import { Suspense, useEffect, useState } from 'react'
// import SidebarSkeleton from './sidebar-skeleton'
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
// import UserSettings from './user-settings'
import { ScrollArea, Scrollbar } from '@radix-ui/react-scroll-area'
// import PullModel from './pull-model'
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
// import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu'
import { TrashIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import useChatStore from '@/stores/useChatStore'

interface SidebarProps {
  isCollapsed: boolean
  messages: Message[]
  onClick?: () => void
  isMobile: boolean
  chatId: string
  closeSidebar?: () => void
}

export function Sidebar({ messages, isCollapsed, isMobile, chatId, closeSidebar }: SidebarProps) {
  const router = useRouter()

  const chats = useChatStore(state => state.chats)
  const handleDelete = useChatStore(state => state.handleDelete)

  return (
    <div
      data-collapsed={isCollapsed}
      className=' relative justify-between group lg:bg-accent/20 lg:dark:bg-card/35 flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 '
    >
      <div className=' flex flex-col justify-between p-2 max-h-fit overflow-y-auto'>
        <Button
          onClick={() => {
            router.push('/')
            if (closeSidebar) {
              closeSidebar()
            }
          }}
          variant='ghost'
          className='flex justify-between w-full h-14 text-sm xl:text-lg font-normal items-center '
        >
          <div className='flex gap-3 items-center '>
            {!isCollapsed && !isMobile && (
              <Image src='/images/agents/dana.webp' alt='AI' width={28} height={28} className=' hidden 2xl:block rounded-full' />
            )}
            گفتگوی جدید
          </div>
          <SquarePen size={18} className='shrink-0 w-4 h-4' />
        </Button>

        <div className='flex flex-col pt-10 gap-2'>
          <p className='pl-4 text-xs text-muted-foreground'>گفتگو های شما</p>
          <Suspense fallback>
            {chats &&
              Object.entries(chats)
                .sort(([, a], [, b]) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map(([id, chat]) => (
                  <Link
                    key={id}
                    href={`/c/${id}`}
                    className={cn(
                      {
                        [buttonVariants({ variant: 'secondaryLink' })]: id === chatId,
                        [buttonVariants({ variant: 'ghost' })]: id !== chatId
                      },
                      'flex justify-between w-full h-14 text-base font-normal items-center '
                    )}
                  >
                    <div className='flex gap-3 items-center truncate'>
                      <div className='flex flex-col'>
                        <span className='text-xs font-normal '>
                          {chat.messages.length > 0 ? chat.messages[0].content : ''}
                        </span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant='ghost'
                          className='flex justify-end items-center'
                          onClick={e => e.stopPropagation()}
                        >
                          <MoreHorizontal size={15} className='shrink-0' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className=' '>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant='ghost'
                              className='w-full flex gap-2 hover:text-red-500 text-red-500 justify-start items-center'
                              onClick={e => e.stopPropagation()}
                            >
                              <Trash2 className='shrink-0 w-4 h-4' />
                              حذف گفتگو
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader className='space-y-4'>
                              <DialogTitle className='text-right pr-4'>حذف گفتگو؟</DialogTitle>
                              <DialogDescription className='text-right'>
                                آیا از حذف این گفتگو مطمئن هستید؟ این عمل غیر قابل برگشت می‌باشد.
                              </DialogDescription>
                              <div className='flex justify-end gap-2'>
                                {/* <Button
                                  variant="outline"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  انصراف
                                </Button> */}
                                <Button
                                  variant='destructive'
                                  onClick={e => {
                                    e.stopPropagation()
                                    handleDelete(id)
                                    router.push('/')
                                  }}
                                >
                                  حذف
                                </Button>
                              </div>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </Link>
                ))}
          </Suspense>
        </div>
      </div>

      <div className='justify-end px-2 py-2 w-full border-t'>
        <UserSettings />
      </div>
    </div>
  )
}
