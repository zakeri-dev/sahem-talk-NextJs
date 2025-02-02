export const agentsInfo = [
  {
    agent: 'soroush',
    name: 'سروش',
    model: 'llama3.3:latest',
    wellcome: 'سلام! متن مورد نظر خودت رو ارسال کن تا برای شما ویرایش کنم.',
    avatar: '/images/agents/soroushn.webp',
    avatarq: '/images/agents/soroushnq.webp',
    messages: [
      { role: 'system', content: 'Speek in persian' },
      {
        role: 'system',
        content:
          'You should not have any kind of conversation or dialogue with the user. If the conversation is initiated by the user, simply say one sentence: "لطفا مقاله خود را ارسال کنید!"'
      },
      {
        role: 'system',
        content:
          'You are an AI agent tasked with the role of a helper in extracting headings from paragraphs of speeches, articles or official texts'
      },
      {
        role: 'system',
        content:
          'If the user submits an article, analyze the article completely, and provide two items from the text accurately: 1-Number of paragraphs based on the literary editor: [Number of literary editor paragraphs]  2-Number of paragraphs based on the continuous meaning of the paragraphs: [Number of meaning paragraphs]'
      },
      {
        role: 'system',
        content: 'Make sure you don not have any conversations and just provide the required output'
      }
    ],
    agentBio: 'df',
    selectedPersona: false,
    updatePersona: () => {}
    // agentConfig: <SoroushConfig/>
  },
  {
    agent: 'kheradYar',
    name: 'خِرَد یار',
    avatar: '/images/agents/noktehyar.webp',
    avatarq: '/images/agents/noktehyarq.webp',
    model: 'nemotron:latest',
    wellcome: 'سلام! متن مورد نظر خودت رو ارسال کن تا برات ویرایش کنم.',
    messages: [
      {
        role: 'system',
        content: `
        befor any thing tell: سلام من خرد یارم.
        `
      }
    ],
    agentBio: '',
    selectedPersona: false,
    updatePersona: () => {}
    // agentConfig: <SoroushConfig/>
  },
  {
    agent: 'vajeBan',
    name: 'واژه بان',
    avatar: '/images/agents/vajeban.webp',
    avatarq: '/images/agents/vajebanq.webp',
    model: 'nemotron:latest',
    wellcome: 'سلام! متن مورد نظر خودت رو ارسال کن تا برات ویرایش کنم.',
    messages: [{ role: 'system', content: 'Speak in English' }],
    agentBio: '',
    selectedPersona: false,
    updatePersona: () => {}
    // agentConfig: <SoroushConfig/>
  },
  // {
  //   agent: 'rahyab',
  //   name: 'رهیاب',
  //   avatar: '',
  //   model: 'nemotron:latest',
  //   wellcome: 'سلام! متن مورد نظر خودت رو ارسال کن تا برات ویرایش کنم.',
  //   messages: [{ role: 'system', content: 'Speak in Russia' }],
  //   agentBio: '',
  //   selectedPersona: false,
  //   updatePersona: () => {}
  //   // agentConfig: <SoroushConfig/>
  // },
  // {
  //   agent: 'nevisa',
  //   name: 'نویسا',
  //   avatar: '',
  //   model: 'nemotron:latest',
  //   wellcome: 'سلام! متن مورد نظر خودت رو ارسال کن تا برات ویرایش کنم.',
  //   messages: [{ role: 'system', content: 'Speak in Persian' }],
  //   agentBio: '',
  //   selectedPersona: false,
  //   updatePersona: () => {}
  //   // agentConfig: <SoroushConfig/>
  // },
  // {
  //   agent: 'farhangYar',
  //   name: 'فرهنگ یار',
  //   avatar: '',
  //   model: 'nemotron:latest',
  //   wellcome: 'سلام! متن مورد نظر خودت رو ارسال کن تا برات ویرایش کنم.',
  //   messages: [{ role: 'system', content: 'Speak in Persian' }],
  //   agentBio: '',
  //   selectedPersona: false,
  //   updatePersona: () => {}
  //   // agentConfig: <SoroushConfig/>
  // },
  // {
  //   agent: 'bineshYar',
  //   name: 'بینش یار',
  //   model: 'nemotron:latest',
  //   wellcome: 'سلام! متن مورد نظر خودت رو ارسال کن تا برات ویرایش کنم.',
  //   messages: [{ role: 'system', content: 'Speak in Persian' }],
  //   agentBio: '',
  //   selectedPersona: false,
  //   updatePersona: () => {}
  //   // agentConfig: <SoroushConfig/>
  // },
  {
    agent: 'zabanYar',
    name: 'زبان یار',
    avatar: '/images/agents/translate.webp',
    avatarq: '/images/agents/translateq.webp',
    model: 'nemotron:latest',
    wellcome: 'سلام! متن مورد نظر خودت رو ارسال کن تا برات ویرایش کنم.',
    messages: [{ role: 'system', content: 'Speak in Persian' }],
    agentBio: '',
    selectedPersona: false,
    updatePersona: () => {}
    // agentConfig: <SoroushConfig/>
  },
  {
    agent: 'nokteYar',
    name: 'نکته یار',
    avatar: '/images/agents/nokteh.webp',
    avatarq: '/images/agents/noktehq.webp',
    model: 'nemotron:latest',
    wellcome: 'سلام! متن مورد نظر خودت رو ارسال کن تا برات ویرایش کنم.',
    messages: [{ role: 'system', content: 'Speak in Persian' }],
    agentBio: '',
    selectedPersona: false,
    updatePersona: () => {}
    // agentConfig: <SoroushConfig/>
  },
  {
    agent: 'pishNegar',
    name: 'پیش نگار',
    avatar: '/images/agents/pishnegar.webp',
    avatarq: '/images/agents/pishnegarq.webp',
    model: 'nemotron:latest',
    wellcome: 'سلام! متن مورد نظر خودت رو ارسال کن تا برات ویرایش کنم.',
    messages: [{ role: 'system', content: 'Speak in Persian' }],
    agentBio: '',
    selectedPersona: false,
    updatePersona: () => {}
    // agentConfig: <SoroushConfig/>
  },
  {
    agent: 'porsana',
    name: 'پُرسانا',
    avatar: '/images/agents/porsana.webp',
    avatarq: '/images/agents/porsanaq.webp',
    model: 'nemotron:latest',
    wellcome: 'سلام! متن مورد نظر خودت رو ارسال کن تا برات ویرایش کنم.',
    messages: [{ role: 'system', content: 'Speak in Persian' }],
    agentBio: '',
    selectedPersona: false,
    updatePersona: () => {}
    // agentConfig: <SoroushConfig/>
  }
  // {
  //   agent: 'parsa',
  //   name: 'پارسا',
  //   avatar: '',
  //   model: 'nemotron:latest',
  //   wellcome: 'سلام! متن مورد نظر خودت رو ارسال کن تا برات ویرایش کنم.',
  //   messages: [{ role: 'system', content: 'Speak in Persian' }],
  //   agentBio: '',
  //   selectedPersona: false,
  //   updatePersona: () => {}
  //   // agentConfig: <SoroushConfig/>
  // }
]
