import useOptionsStore, { AiPersona } from '@/stores/useOptionsStore'
import React from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { agentsInfo } from './agents/agents'

export default function Index() {
  const router = useRouter()
  const selectedPersona = useOptionsStore(state => state.selectedPersona)
  const updatePersona = useOptionsStore(state => state.updatePersona)
  const handlePersona = (agent: AiPersona) => {
    // console.log(agent)
    // console.log(persona)
    updatePersona(agent)
    // router.push('/')
    // console.log(persona)
  }
  return (
    <div className=' relative justify-between group  flex flex-col h-screen gap-2 p-2 data-[collapsed=true]:p-2 overflow-y-auto'>
      <div className='lg:bg-accent lg:dark:bg-secondary p-2 rounded-md'>
        همیاران
        <p className='pl-4 text-xs text-muted-foreground'>همیار خودتون رو انتخاب و تنظیم کنید.</p>
      </div>
      {/* <div className=' flex flex-col justify-between py-2 h-full overflow-hidden'> */}
      <div className='grid grid-cols-12 gap-2' style={{ height: 'calc(100vh - 130px)' }}>
        <div className='col-span-10 flex flex-col gap-3 overflow-hidden'>
          <div className='h-1/2 lg:bg-accent lg:dark:bg-secondary p-2 rounded-md overflow-y-scroll'>
            <div dangerouslySetInnerHTML={{__html:selectedPersona.agentBio}} />
          </div>
          <div className='h-1/2 lg:bg-accent lg:dark:bg-secondary p-2 rounded-md overflow-y-scroll'>
            {/* <SoroushBio /> */}1
          </div>
        </div>
        <div className='col-span-2 flex flex-col lg:bg-accent lg:dark:bg-secondary p-1 rounded-md py-5 gap-2 text-sm text-center  overflow-y-scroll'>
          {agentsInfo.map((agent, index) => (
            <div className='cursor-pointer' key={index} onClick={() => handlePersona(agent)}>
              <div className='bg-gradient-to-r from-amber-500 to-yellow-500 rounded-sm'>
                <Image
                  src={agent.avatarq ? agent.avatarq : agent.avatar}
                  alt='AI'
                  width={100}
                  height={100}
                  unoptimized
                  className='aspect-square w-64 object-contain '
                />
              </div>
              <span className='whitespace-nowrap'>{agent.name}</span>
            </div>
          ))}
        </div>
      </div>
      {/* </div> */}

      <div
        onClick={() =>
          handlePersona({
            agent: '',
            name: '',
            model: '',
            wellcome: '',
            avatar: null,
            avatarq: null,
            messages: undefined,
            agentBio: null
          })
        }
        className='justify-end lg:bg-accent lg:dark:bg-secondary p-2 rounded-md text-center cursor-pointer hover:scale-105 transition-all duration-150'
      >
        گفتگو با « دانا »
      </div>
    </div>
  )
}
