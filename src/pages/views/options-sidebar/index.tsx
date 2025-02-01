import useOptionsStore from '@/stores/useOptionsStore'
import React from 'react'

export default function Index() {
  const selectedAgent = useOptionsStore(state => state.selectedAgent)
  console.log(selectedAgent)
  return (
    <div className=' relative justify-between group  flex flex-col h-full gap-2 p-2 data-[collapsed=true]:p-2 overflow-y-auto'>
        <div className='lg:bg-accent lg:dark:bg-secondary p-2 rounded-md'>
          همیاران
          <p className='pl-4 text-xs text-muted-foreground'>همیار خودتون رو انتخاب و تنظیم کنید.</p>
        </div>
      {/* <div className=' flex flex-col justify-between py-2 h-full overflow-hidden'> */}
        <div className='grid grid-cols-12 gap-2 h-full'>
          <div className='col-span-8 flex flex-col gap-2 lg:bg-accent lg:dark:bg-secondary p-2 rounded-md'>dd</div>
          <div className='col-span-4 flex flex-col justify-center lg:bg-accent lg:dark:bg-secondary p-1 rounded-md pb-10 gap-2 text-sm text-center overflow-y-scroll'>
            <div>
              <div className='aspect-square border'>s</div>
              یک دو سه
            </div>
            <div>
              <div className='aspect-square border'>s</div>
              یک دو سه
            </div>
            <div>
              <div className='aspect-square border'>s</div>
              یک دو سه
            </div>
            <div>
              <div className='aspect-square border'>s</div>
              یک دو سه
            </div>
            <div>
              <div className='aspect-square border'>s</div>
              یک دو سه
            </div>
            <div>
              <div className='aspect-square border'>s</div>
              یک دو سه
            </div>
            <div>
              <div className='aspect-square border'>s</div>
              یک دو سه
            </div>
          </div>
        </div>
      {/* </div> */}

      <div className='justify-end p-2 w-full border-t text-center cursor-pointer hover:scale-105 transition-all duration-150'>
        گفتگو با همراه
      </div>
    </div>
  )
}
