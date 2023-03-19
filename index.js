const btn = document.querySelector(".btn-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
  document.body.classList.toggle("dark-theme");
} else if (currentTheme == "light") {
  document.body.classList.toggle("light-theme");
}

btn.addEventListener("click", function () {
  if (prefersDarkScheme.matches) {
    document.body.classList.toggle("light-theme");
    var theme = document.body.classList.contains("light-theme")
      ? "light"
      : "dark";
  } else {
    document.body.classList.toggle("dark-theme");
    var theme = document.body.classList.contains("dark-theme")
      ? "dark"
      : "light";
  }
  localStorage.setItem("theme", theme);
});

const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  
  let text = textNode.text;
  
  let start = 0;
  let end = 0;
  while (text.includes('$', start)) {
	start = text.indexOf('$', start);
	end = text.indexOf(' ', start);
	
	let v = text.substring(start + 1, end);
	
	if (state[v]) {
	  text = text.substring(0, start) + state[v] + text.substring(end)
	}
	
	start = end;
  }
  
  textElement.innerText = text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const optionDiv = document.createElement('div')
      optionDiv.innerText = option.text
      optionDiv.classList.add('option')
      optionDiv.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(optionDiv)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: '',
    options: [
      {
        text: 'შენ დაინახე ჯულია',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'ის დაახლოებით შენი ასაკისაა, 30 წლამდე. ის იცინის კარგად ჩაცმულ პროფესორებთან და სტუდენტებთან ერთად, რომლებიც არიან ახლომდებარე უნივერსიტეტიდან. \n\nშენ, ჰენრი, დასალევად ხარ მეგობრებთან ერთად.',
    options: [
      {
        text: 'მიხვედი მასთან',
        nextText: 3
      },
    ]
  },
  {
    id: 3,
    text: 'შენ მთვრალი ხარ',
    options: [
      {
        text: 'ისა... რა ქვია, რა პროფესიის ხარ?',
        nextText: 4
      },
      {
        text: 'შენ... შენ მშვენიერი ხარ',
        nextText: 5
      }
    ]
  },
  {
    id: 5,
    text: 'მას გაეღიმა და მადლობა გადაგიხადა',
    options: [
      {
        text: 'ისა... რა ქვია, რა პროფესიის ხარ?',
        nextText: 4
      }
    ]
  },
  {
    id: 4,
    text: 'როცა პროფესია კითხე უცნაურად გაუღიმე.\n\nევოლოციური ბიოლოგია თქვა მან. და მე პროფესორი ვარ. \n\n...მაგარია, მიუგე შენ.\n\nშენი რა არის? გკითხა მან. ჰაერი ჩაისუნთქა.',
    options: [
      {
        text: 'ტოქსიკოლოგია?',
        nextText: 6
      }
    ]
  },
  {
    id: 6,
    text: 'ეს წაკბენა იყო? შეეკითხე შენ. \n\nნამდვილად, გიპასუხა მან. \n\nარ უნდოდა რომ შენ გრძნობებზე ეთამაშა, ამიტომ შემოგთავაზა ჩიზბურგერის გაყოფა.',
    options: [
      {
        text: 'ერთი კვირის მერე შენ ხარ ჯულიას შეყვარებული.',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'თქვენ ერთი წელია უკვე რაც ხვდებით.',
    options: [
      {
        text: 'ის შენ გაგიჟებს. ეს მშვენიერია.',
        nextText: 8
      }
    ]
  },
  {
    id: 8,
    text: 'თქვენ ერთად გადახვედით საცხოვრებლად, სკოლასთან ახლოს, ხედით მთებზე. თქვენ ხშირად სვავთ ლუდს.',
    options: [
      {
        text: 'ცხოვრება მშვენიერია.',
        nextText: 9
      }
    ]
  },
  {
    id: 9,
    text: '',
    options: [
      {
        text: 'ჯულიას ძაღლის აყვანა უნდა.',
        nextText: 10
      }
    ]
  },
  {
    id: 10,
    text: 'არის პატარა აწეწილი ბიგლი, ჯულია მასზე შეყვარებულია. უნდა რომ თავის კლასში ატაროს. \n\n ასევე არის გერმანული ნაგაზი მეტყველი თბილი თვალებით. არაფერი ცუდი არ მოხდება ჯულიას თავს როცა მასთან ერთად იქნება. ის ძალიან ძლიერია.',
    options: [
      {
        text: 'თქვენ ბიგლი აიყვანეთ და ჯულიამ დაარქვა მას ბაქეთი.',
		setState: { dogName: 'ბაქეთი', dogName1: 'ბაქეთის' },
        nextText: 11
      },
	  {
        text: 'თქვენ გერმანული ნაგაზი აიყვანეთ და ჯულიამ დაარქვა მას მაიჰემი.',
		setState: { dogName: 'მაიჰემი', dogName1: 'მაიჰემის' },
        nextText: 11
      }
    ]
  },
  {
    id: 11,
    text: '$dogName არის კარგი ძაღლი და ერთი კვირის შემდეგ შენ საერთოდ დაგავწყდა მეორე ძაღლი. \n\nჯულიას უყვარს ის.',
    options: [
      {
        text: 'შენც გიყვარს ის.',
        nextText: 12
      }
    ]
  },
  {
    id: 12,
    text: '1979\n\nზაფხულია, საღამოს 9 საათი. ჯერ კიდევ სიცხეა ჩამოწოლილი.',
    options: [
      {
        text: 'რას ფიქრობ ბავშვების შესახებ? შეგეკითხა ის',
        nextText: 13
      }
    ]
  },
  {
    id: 13,
    text: 'ბავშვები...? ისინი არ არიან ჭკვიანები. არც სხვა რამეში არიან ძლიერები.\n\nმე ვამბობ მე და შენ რომ გვყავდეს, რამდენიმე პატარა იდიოტი.',
    options: [
      {
        text: 'ეს შესანიშნავი იქნებოდა',
        nextText: 14
      },
	  {
        text: 'შეიძლება ერთ დღესაც, რატომ ვიჩქაროთ?',
        nextText: 15
      }
    ]
  },
  {
    id: 14,
    text: 'ამ შემთხვევაში ჩვენ ალბათ უნდა დავქორწინდეთ.\n\nხოო, კარგი იდეაა. უპასუხე შენ. \n\nბავშვებისთვის ალბათ უკეთესი იქნება თუ მათი მშობლები დაქორწინებულები იქნებიან.',
    options: [
      {
        text: 'შენ მას დაეთანხმე.',
        nextText: 15
      }
    ]
  },
  {
    id: 15,
    text: '1980\n\nხუთშაბათი საღამოა და მანდ სამსახურიდან 4 საათი დააგვიანა. ჯულიას არ დაურეკია. შენ ნერვიულობ და თან ბრაზდები რაც დრო გადის.',
    options: [
      {
        text: 'როდესაც შენ დაწექი საწოლში, ისიც მოვიდა.',
        nextText: 16
      }
    ]
  },
  {
    id: 16,
    text: 'ის არც ძალიან მთვრალია, თუმცა ნათელია რომ კარგად გაერთო. ასეთ დროს თქვენ ყოველთვის ჩხუბობთ.',
    options: [
      {
        text: 'შენ განრისხდი მასზე',
        nextText: 17
      },
	  {
        text: 'შენ დააიგნორე ის',
        nextText: 18
      }
    ]
  },
  {
    id: 17,
    text: 'შენ მას უყურადღებო დებილი უწოდე. \n\nმან გითხრა რომ გააჯვა და არ მოიქცე პატარა ბავშვივით. \n\nშენ მას ეგოისტი უწოდე.',
    options: [
      {
        text: 'ის მიხვდა რომ ამას ნამდვილად გულისხმობდი და მას გული ეტკინა.',
        nextText: 18
      }
    ]
  },
  {
    id: 18,
    text: '1981 \n\nჯულიას ისევ უყვარს ხატვა. ის ხატავს მცენარეებს თავისი რესერჩიდან. ხატავს ყველა ადგილს სადაც დადიხართ. ის შენ გხატავს.',
    options: [
      {
        text: 'შენ იჭიმები მხრებში და იღებ მამაკაცურ პოზას.',
        nextText: 19
      },
	  {
        text: 'სექსუალურად იკლაკნები და იღებ ვიქტორია სეკრეტის მოდელების პოზას.',
        nextText: 19
      }
    ]
  },
  {
    id: 19,
    text: '',
    options: [
      {
        text: 'ძალიან კარგი',
        nextText: 20
      }
    ]
  },
  {
    id: 20,
    text: '1982',
    options: [
      {
        text: 'ზაფხულის განმავლობაში და შენ ჯულიას ძალიან მოგწონდათ $dogName1 გასეირნება საღამოობით',
        nextText: 21
      }
    ]
  },
  {
    id: 21,
    text: 'ქალაქში ფესტივალი იმართება. ბევრი ხალხი ჩამოდის ამ დროს.',
    options: [
      {
        text: 'ერთ ერთმა მათგანმა გადაწყვიტა შენი გაძარცვა დანის დახამრებით.',
        nextText: 22
      }
    ]
  },
  {
    id: 22,
    text: '$dogName1 წიხლი ამოარტყეს. \n\nჯულიას ენა დაება, როცა ნერვიულოს ასე მოსდის ხოლმე. \n\nშენ თავდასხმელს დაუპირისპირდი.',
    options: [
      {
        text: 'გადაწყვიტე შეაშინო',
        nextText: 23
      },
	  {
        text: 'გადაწყვიტე მუშტი დაარტყა სახეში',
        nextText: 24
      }
    ]
  },
  {
    id: 23,
    text: 'შენ ხელი ზურგს უკან წაიღე, თითქოს იარაღი გედო და დაუყვირე რომ მოკლავდი მას. მას შეეშინდა და გაიქცა. \n\nჯულიამ გადაწყვიტა ამ გზაზე აღარ გვევლო. \n\nშენ დათანხმდი. არც შენ გსურდა ამ გზაზე სიარული.',
    options: [
      {
        text: 'ამის მერე მდინარის გასწვრივ სიერნობდით',
        nextText: 25
      }
    ]
  },
  {
    id: 24,
    text: 'შენ მუშტი მოიქნიე და მას მოარტყი. ის ცოტა წაბორძიკდა და უკან გაიწია. მას შეეშინდა და გაიქცა. \n\nჯულიამ გადაწყვიტა ამ გზაზე აღარ გვევლო. \n\nშენ დათანხმდი. არც შენ გსურდა ამ გზაზე სიარული.',
    options: [
      {
        text: 'ამის მერე მდინარის გასწვრივ სიერნობდით',
        nextText: 25
      }
    ]
  },
]

startGame()