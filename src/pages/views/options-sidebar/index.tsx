import useOptionsStore from '@/stores/useOptionsStore'
import React from 'react'
import SoroushBio from './agents/soroush/Soroush'

const agentsInfo = {
  soroush: {
    name: 'سروش',
    avatar: '',
    model: 'nemotron:latest',
    prompts: [
      { role: 'system', content: 'Speak in Persian' },
      { role: 'system', content: 'Speak in Persian' },
      { role: 'system', content: 'Speak in Persian' }
    ],
    agentBio: <SoroushBio />
    // agentConfig: <SoroushConfig/>
  },
  kheradYar: {
    name: 'خِرَد یار',
    avatar: '',
    model: 'nemotron:latest',
    prompts: [
      { role: 'system', content: 'Speak in Persian' },
      { role: 'system', content: 'Speak in Persian' },
      { role: 'system', content: 'Speak in Persian' }
    ],
    agentBio: <SoroushBio />
    // agentConfig: <SoroushConfig/>
  },
  vajeBan: {
    name: 'واژه بان',
    avatar: '',
    model: 'nemotron:latest',
    prompts: [
      { role: 'system', content: 'Speak in Persian' },
      { role: 'system', content: 'Speak in Persian' },
      { role: 'system', content: 'Speak in Persian' }
    ],
    agentBio: <SoroushBio />
    // agentConfig: <SoroushConfig/>
  },
  rahyab: {
    name: 'رهیاب',
    avatar: '',
    model: 'nemotron:latest',
    prompts: [
      { role: 'system', content: 'Speak in Persian' },
      { role: 'system', content: 'Speak in Persian' },
      { role: 'system', content: 'Speak in Persian' }
    ],
    agentBio: <SoroushBio />
    // agentConfig: <SoroushConfig/>
  },
  nevisa: {
    name: 'نویسا',
    avatar: '',
    model: 'nemotron:latest',
    prompts: [
      { role: 'system', content: 'Speak in Persian' },
      { role: 'system', content: 'Speak in Persian' },
      { role: 'system', content: 'Speak in Persian' }
    ],
    agentBio: <SoroushBio />
    // agentConfig: <SoroushConfig/>
  },
  farhangYar: {
    name: 'فرهنگ یار',
    avatar: '',
    model: 'nemotron:latest',
    prompts: [
      { role: 'system', content: 'Speak in Persian' },
      { role: 'system', content: 'Speak in Persian' },
      { role: 'system', content: 'Speak in Persian' }
    ],
    agentBio: <SoroushBio />
    // agentConfig: <SoroushConfig/>
  },
  bineshYar: {
    name: 'بینش یار',
    model: 'nemotron:latest',
    prompts: [
      { role: 'system', content: 'Speak in Persian' },
      { role: 'system', content: 'Speak in Persian' },
      { role: 'system', content: 'Speak in Persian' }
    ],
    agentBio: <SoroushBio />
    // agentConfig: <SoroushConfig/>
  },
  nokteYar: {
    name: 'نکته یار',
    model: 'nemotron:latest',
    prompts: [
      { role: 'system', content: 'Speak in Persian' },
      { role: 'system', content: 'Speak in Persian' },
      { role: 'system', content: 'Speak in Persian' }
    ],
    agentBio: <SoroushBio />
    // agentConfig: <SoroushConfig/>
  },
  pishNegar: {
    name: 'پیش نگار',
    avatar: '',
    model: 'nemotron:latest',
    prompts: [
      { role: 'system', content: 'Speak in Persian' },
      { role: 'system', content: 'Speak in Persian' },
      { role: 'system', content: 'Speak in Persian' }
    ],
    agentBio: <SoroushBio />
    // agentConfig: <SoroushConfig/>
  },
  porsana: {
    name: 'پُرسانا',
    avatar: '',
    model: 'nemotron:latest',
    prompts: [
      { role: 'system', content: 'Speak in Persian' },
      { role: 'system', content: 'Speak in Persian' },
      { role: 'system', content: 'Speak in Persian' }
    ],
    agentBio: <SoroushBio />
    // agentConfig: <SoroushConfig/>
  },
  parsa: {
    name: 'پارسا',
    avatar: '',
    model: 'nemotron:latest',
    prompts: [
      { role: 'system', content: 'Speak in Persian' },
      { role: 'system', content: 'Speak in Persian' },
      { role: 'system', content: 'Speak in Persian' }
    ],
    agentBio: <SoroushBio />
    // agentConfig: <SoroushConfig/>
  }
}

export default function Index() {
  const persona = useOptionsStore(state => state.persona)
  const updateSelectedAgent = useOptionsStore(state => state.updateSelectedAgent)
  const updateModel = useOptionsStore(state => state.updateModel)
  const updateMessages = useOptionsStore(state => state.updateMessages)
  const handlePersona = (agent: string, model: string, messages: { role: string; content: string }[]) => {
    console.log(persona)
    updateSelectedAgent(agent)
    updateModel(model)
    updateMessages(messages)
    console.log(persona)
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
          <div className='lg:bg-accent lg:dark:bg-secondary p-2 rounded-md overflow-y-scroll'>
            <SoroushBio />
          </div>
          <div className='lg:bg-accent lg:dark:bg-secondary p-2 rounded-md overflow-y-scroll'>
            <SoroushBio />
          </div>
        </div>
        <div className='col-span-2 flex flex-col lg:bg-accent lg:dark:bg-secondary p-1 rounded-md py-5 gap-2 text-sm text-center  overflow-y-scroll'>
          {Object.entries(agentsInfo).map(
            ([key, agent]: [string, (typeof agentsInfo)[keyof typeof agentsInfo]], index: number) => (
              <div className='cursor-pointer' key={index} onClick={() => handlePersona(agent.name, agent.model, agent.prompts)}>
                <div className='aspect-square border'>s</div>
                <span className='whitespace-nowrap'>{agent.name}</span>
              </div>
            )
          )}
        </div>
      </div>
      {/* </div> */}

      <div className='justify-end lg:bg-accent lg:dark:bg-secondary p-2 rounded-md text-center cursor-pointer hover:scale-105 transition-all duration-150'>
        گفتگو با همراه
      </div>
    </div>
  )
}
