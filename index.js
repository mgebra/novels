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

  text = changeTextVariables(textNode.text);
  textElement.innerText = text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const optionDiv = document.createElement('div')
      let text = changeTextVariables(option.text);
      optionDiv.innerText = text
      optionDiv.classList.add('option')
      optionDiv.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(optionDiv)
    }
  })
}

function changeTextVariables(text) {
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

  return text;
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
        text: 'რა პროფესიის ხარ? კითხე შენ.',
        nextText: 4
      }
    ]
  },
  {
    id: 4,
    text: 'როცა პროფესია კითხე უცნაურად გაუღიმე.\n\nევოლოციური ბიოლოგია თქვა მან. და მე პროფესორი ვარ. \n\n...მაგარია, მიუგე შენ.\n\nშენი პროფესია რა არის? გკითხა მან. ჰაერი ჩაისუნთქა.',
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
        setState: { dogName: 'ბაქეთი', dogName1: 'ბაქეთის', dogName2: 'ბაქეთს' },
        nextText: 11
      },
      {
        text: 'თქვენ გერმანული ნაგაზი აიყვანეთ და ჯულიამ დაარქვა მას მაიჰემი.',
        setState: { dogName: 'მაიჰემი', dogName1: 'მაიჰემის', dogName2: 'მაიჰემს' },
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
        text: 'სექსუალურად იკლაკნები და იღებ ვიქტორია სეკრეტის მოდელების პოზას. (ანდრო, შენ რომ გადაახვიე ის მომენტია :D)',
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
    text: '$dogName2 წიხლი ამოარტყეს. \n\nჯულიას ენა დაება, როცა ნერვიულოს ასე მოსდის ხოლმე. \n\nშენ თავდასხმელს დაუპირისპირდი.',
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
  {
    id: 25,
    text: '1984',
    options: [
      {
        text: 'ბევრი საქმის გამო ბავშვების ყოლაზე ვერ მოიცალეთ.',
        nextText: 26
      }
    ]
  },
  {
    id: 26,
    text: 'ჯულიას სამსახური შესთავაზეს იელში. იელი 3000 კილომეტრის დაშორებითაა. შესანიშნავი შემოთავაზებაა: ასოცირებული დეპარტამენტის ადგილი. ჯულიას გადასვლა უნდა. \n\nშენ საერთოდ არ გინდა გადასვლა.',
    options: [
      {
        text: 'დაარწმუნე რომ არ წავიდეს.',
        nextText: 27
      },
      {
        text: 'დაეთანხმე მხოლოდ იმ შემთხვევაში თუ წინ და უკან ივლის.',
        nextText: 28
      }
    ]
  },
  {
    id: 27,
    text: 'შენ მას უთხარი, რომ ეს ნიშნავს რომ თქვენ ორს არ გექნებატ ოჯახი. \nმან გიპასუხა რომ ეს ტყუილლია. (ის მართალია) \n\nმან გკითხა რომ ეს ნიშნავდა თუ არა იმას რომ შენ არ წაყვებოდი. შენ თქვი რომ კი.',
    options: [
      {
        text: 'მან გადაწყვიტა რომ არ მიეღო ეს შემოთავაზება.',
        nextText: 29
      }
    ]
  },
  {
    id: 28,
    text: 'მან გკითხა რომ ეს ნიშნავდა თუ არა იმას რომ შენ არ წაყვებოდი. შენ თქვი რომ კი. \n\nმან შემოგთავაზა რომ მასთან ერთად წასულიყავი, თუმცა შენ იუარე.',
    options: [
      {
        text: 'მან გადაწყვიტა რომ არ მიეღო ეს შემოთავაზება.',
        nextText: 29
      }
    ]
  },
  {
    id: 29,
    text: '1985 \n\nჯულიას უთხრეს რომ შვებულება აეღო, მას შემდეგ რაც დაკარგა წიგნები რომელიც მისი კოლეგის ნაშრომისთვის იყო მნიშვნელოვანი.',
    options: [
      {
        text: 'მას არ ახსოვდა რომ ეს წგინები ორი დღით ადრე ითხოვა.',
        nextText: 30
      }
    ]
  },
  {
    id: 30,
    text: 'ის იპოვეს კიბის უჯრედში როცა ტიროდა.',
    options: [
      {
        text: 'შენ მას უთხარი რომ იქნება ვინმესთან უნდა გელაპარაკათ ამის შესახებ.',
        nextText: 31
      },
      {
        text: 'შენ მას მაკარონი გაუმზადე, დალიეთ ღვინო და ეცადეთ დაგევიწყებინათ ამის შესახებ.',
        nextText: 31
      }
    ]
  },
  {
    id: 31,
    text: 'რამდენიმე ექიმთან ნახვის და გამოკვლელვების შემდეგ დაისვა დიაგნოზი რომ ჯულიას ადრეული დემენცია აქვს. ის არის 41 წლის.',
    options: [
      {
        text: 'ორივემ გადაწყვიტეთ რომ ეს არავისთვის გეთქვატ',
        nextText: 32
      }
    ]
  },
  {
    id: 31,
    text: 'რამდენიმე ექიმთან ნახვის და გამოკვლელვების შემდეგ დაისვა დიაგნოზი რომ ჯულიას ადრეული დემენცია აქვს. ის არის 41 წლის.',
    options: [
      {
        text: 'ორივემ გადაწყვიტეთ რომ ეს არავისთვის გეთქვატ',
        nextText: 32
      }
    ]
  },
  {
    id: 32,
    text: '$dogName დაბერდა. ჯულიამ თქვა რომ ეს რაღაცნაირად კარგია, რადგან ის ნაკლებ პრობლემებში ეხვევა სახლში ყოფნისას.',
    options: [
      {
        text: 'ერთი კვირის შემდეგ, ჯულია ბრუნდება უნივერსიტეტში.',
        nextText: 33
      }
    ]
  },
  {
    id: 33,
    text: '1987 \n\nჯულიას მდგომარეობა უარესდება. მას არ შეუძლია რაღაცეების დამახსოვრება კლასში. ის მიდის მანქანით მეზობელ ქალაქში უმიზეზოდ და შემდეგ პოლიციას მოყავს უკან. \n\nის განადგურებულია.',
    options: [
      {
        text: 'ის სამუდამოდ გამოუშვეს სახლში ჯამრთელობის მისახედად.',
        nextText: 34
      }
    ]
  },
  {
    id: 34,
    text: 'ზოგჯერ ის შენ სულელეს გეძახის და თქვენ არდაბადებულ ბავშვებს კი პატარა იდიოტებს. სხვა დღეებში კი უცნობივით იქცევა.',
    options: [
      {
        text: 'ის საწოლში გეძახის სიყვარულისთვის. ხოლო 5 წუთში კი პანიკაში ვარდება და იძახის რომ მამამისია კარებთან.',
        nextText: 35
      }
    ]
  },
  {
    id: 35,
    text: 'შენ მის მშობლებს დაელაპარაკე. მათ ძალიან განიცადეს და დაიწყეს წინ და უკან სიარული თავიანთი სახლიდან ავსტრალიიდან მის სანახავად. \n\nრაღაც პერიოდი მეგობრები გსტუმროენ, რომ დღეები გაგიფერადონ.',
    options: [
      {
        text: 'მისი მდგომარეობა უარესდება.',
        nextText: 36
      }
    ]
  },
  {
    id: 36,
    text: '1988 \n\nშენ ატარებ დღეებს სახლში ჯულიას კუდში დევნაში. ითვლი წამებს დანიელის მოსვლაში, რომელიც ექთანია და ორ კვირაში ერთხელ მოდის. \n\nმან გირჩია რომ უკეთესი იქნებოდა თუ ჯულია სხვაგან იცოხვრებდა, სადაც 24 საათის განმავლობაში მიხედავდნენ.',
    options: [
      {
        text: 'შენ გადაწყვიტე რომ თვითონ მიგეხედა',
        nextText: 37
      }
    ]
  },
  {
    id: 37,
    text: 'ეს ძალიან რთულია. \n\nუარესდება როცა შენ მასზე ბრაზდები, მაგალითად როცა ცდილობს საკუთარი საჭმლის მომზადებას.',
    options: [
      {
        text: 'შენ არაფრის გაკეთება შეგიძლია მის გარეშე და მას არ შეუძლია არაფრის გაკეთება შენ გარეშე.',
        nextText: 38
      }
    ]
  },
  {
    id: 38,
    text: 'როდესაც ის იძინებს, შენ კიდევ რამდენიმე საათი რჩები ფეხზე. სვავ. უყურებ ფეხბურთს ან კალათბურთს.',
    options: [
      {
        text: 'სვავ მაგ დროსაც.',
        nextText: 39
      }
    ]
  },
  {
    id: 39,
    text: 'შენ დაიწყე გარეთ სიარული როცა მას აძინებ. \n\nპირველად ძალიან ღელავდი, რომ არ ამდგარიყო და სიარული არ დაეწყო სანამ შენ გასული იყავი.',
    options: [
      {
        text: 'დადგი სკმარი საძინებლის კარებთან',
        nextText: 40
      },
      {
        text: 'გჯერა რომ ღრმად ძინავს',
        nextText: 40
      }
    ]
  },
  {
    id: 40,
    text: 'დადიხარ ერთი და იგივე ბარში, იქ ყოფნა მოგწონს. დროთა განმავლობაში ბარისტა შეილას ყველაფერი მოუყევი. თითქოს მძიმე ტვირთი მოიხსენი. ღამის ორი საათისთვის სახლში იყავი. კვირაში რამდენჯერმე ასე დადიოდი.',
    options: [
      {
        text: 'ელოდები ხოლმე ასეთ საღამოებს.',
        nextText: 41
      }
    ]
  },
  {
    id: 41,
    text: 'ერთ ღამეს პატრულმა გაგაჩერა და სიმთვრალე დაგიდასტურდა. იმ ღამით წინასწარი დაკავების საკანში გადაგიყვანეს.',
    options: [
      {
        text: 'იფიქრე დაგემალა, მაგრამ დაურეკე ჯულიას დას, სუზანს',
        nextText: 42
      }
    ]
  },
  {
    id: 42,
    text: 'ჯულიას მშობლები შემდეგივე რეისით გამოფრინდნენ ავსტრალიიდან. \nმათ არ ჯეროდან სახლში არსებული არეულობის. \n\nშემდეგ მათ გითხრეს რომ ჯულია მიაყვდათ თავისთან საცხოვრებლად. \n\nშენ წინააღმდეგობა არ გაგიწევია. უთხარი რომ მალე მოინახულებდი. \n\nრამდენიმე კვირა გავიდა.',
    options: [
      {
        text: 'ზაფხული მოდიოდა და შენ გაზეთში წააწყდი განცხადებას სამსახურის შესახებ',
        nextText: 42
      }
    ]
  },
  {
    id: 43,
    text: '',
    options: [
      {
        text: 'შენ მას დათანხმდი.',
        nextText: 43
      }
    ]
  },
]

startGame()