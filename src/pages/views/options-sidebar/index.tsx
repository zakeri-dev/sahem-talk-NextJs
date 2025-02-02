import useOptionsStore, { AiPersona } from '@/stores/useOptionsStore'
import React from 'react'
import SoroushBio from './agents/soroush/Soroush'
import { useRouter } from 'next/navigation'

const agentsInfo = [
  {
    agent: 'soroush',
    name: 'سروش',
    model: 'nemotron:latest',
    wellcome: 'سلام! متن مورد نظر خودت رو ارسال کن تا برات ویرایش کنم.',
    avatar: '/images/personas/Elderly Scientist.png',
    messages: [{ role: 'system', content: 'Speak in Persian' }],
    agentBio: <SoroushBio />
    // agentConfig: <SoroushConfig/>
  },
  {
    agent: 'kheradYar',
    name: 'خِرَد یار',
    avatar: '',
    model: 'nemotron:latest',
    wellcome: 'سلام! متن مورد نظر خودت رو ارسال کن تا برات ویرایش کنم.',
    messages: [{ role: 'system', content: 'Speak in Chinees' }],
    agentBio: <SoroushBio />
    // agentConfig: <SoroushConfig/>
  },
  {
    agent: 'vajeBan',
    name: 'واژه بان',
    avatar: '',
    model: 'nemotron:latest',
    wellcome: 'سلام! متن مورد نظر خودت رو ارسال کن تا برات ویرایش کنم.',
    messages: [{ role: 'system', content: 'Speak in English' }],
    agentBio: <SoroushBio />
    // agentConfig: <SoroushConfig/>
  },
  {
    agent: 'rahyab',
    name: 'رهیاب',
    avatar: '',
    model: 'nemotron:latest',
    wellcome: 'سلام! متن مورد نظر خودت رو ارسال کن تا برات ویرایش کنم.',
    messages: [{ role: 'system', content: 'Speak in Russia' }],
    agentBio: <SoroushBio />
    // agentConfig: <SoroushConfig/>
  },
  {
    agent: 'nevisa',
    name: 'نویسا',
    avatar: '',
    model: 'nemotron:latest',
    wellcome: 'سلام! متن مورد نظر خودت رو ارسال کن تا برات ویرایش کنم.',
    messages: [{ role: 'system', content: 'Speak in Persian' }],
    agentBio: <SoroushBio />
    // agentConfig: <SoroushConfig/>
  },
  {
    agent: 'farhangYar',
    name: 'فرهنگ یار',
    avatar: '',
    model: 'nemotron:latest',
    wellcome: 'سلام! متن مورد نظر خودت رو ارسال کن تا برات ویرایش کنم.',
    messages: [{ role: 'system', content: 'Speak in Persian' }],
    agentBio: <SoroushBio />
    // agentConfig: <SoroushConfig/>
  },
  {
    agent: 'bineshYar',
    name: 'بینش یار',
    model: 'nemotron:latest',
    wellcome: 'سلام! متن مورد نظر خودت رو ارسال کن تا برات ویرایش کنم.',
    messages: [{ role: 'system', content: 'Speak in Persian' }],
    agentBio: <SoroushBio />
    // agentConfig: <SoroushConfig/>
  },
  {
    agent: 'nokteYar',
    name: 'نکته یار',
    model: 'nemotron:latest',
    wellcome: 'سلام! متن مورد نظر خودت رو ارسال کن تا برات ویرایش کنم.',
    messages: [{ role: 'system', content: 'Speak in Persian' }],
    agentBio: <SoroushBio />
    // agentConfig: <SoroushConfig/>
  },
  {
    agent: 'pishNegar',
    name: 'پیش نگار',
    avatar: '',
    model: 'nemotron:latest',
    wellcome: 'سلام! متن مورد نظر خودت رو ارسال کن تا برات ویرایش کنم.',
    messages: [{ role: 'system', content: 'Speak in Persian' }],
    agentBio: <SoroushBio />
    // agentConfig: <SoroushConfig/>
  },
  {
    agent: 'porsana',
    name: 'پُرسانا',
    avatar: '',
    model: 'nemotron:latest',
    wellcome: 'سلام! متن مورد نظر خودت رو ارسال کن تا برات ویرایش کنم.',
    messages: [{ role: 'system', content: 'Speak in Persian' }],
    agentBio: <SoroushBio />
    // agentConfig: <SoroushConfig/>
  },
  {
    agent: 'parsa',
    name: 'پارسا',
    avatar: '',
    model: 'nemotron:latest',
    wellcome: 'سلام! متن مورد نظر خودت رو ارسال کن تا برات ویرایش کنم.',
    messages: [{ role: 'system', content: 'Speak in Persian' }],
    agentBio: <SoroushBio />
    // agentConfig: <SoroushConfig/>
  }
]

export default function Index() {
  const router = useRouter()
  const persona = useOptionsStore(state => state.persona)
  const updatePersona = useOptionsStore(state => state.updatePersona)
  const handlePersona = (agent: AiPersona) => {
    // console.log(agent)
    // console.log(persona)
    updatePersona(agent)
    router.push('/')
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
            <SoroushBio />
          </div>
          <div className='h-1/2 lg:bg-accent lg:dark:bg-secondary p-2 rounded-md overflow-y-scroll'>
            {/* <SoroushBio /> */}1
          </div>
        </div>
        <div className='col-span-2 flex flex-col lg:bg-accent lg:dark:bg-secondary p-1 rounded-md py-5 gap-2 text-sm text-center  overflow-y-scroll'>
          {agentsInfo.map((agent, index) => (
            <div className='cursor-pointer' key={index} onClick={() => handlePersona(agent)}>
              <div className='aspect-square border'>s</div>
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
