import { Product, VideoItem } from './types';

export const products: Product[] = [
  {
    id: "BY-6033",
    model: "BY.6033 Legenda",
    category: "sofa",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=1200&q=80"
    ],
    dimensions: "280 x 105 x 85 cm",
    price: 3450,
    featured: true,
    newArrival: true,
    material: {
      uz: "100% Premium Italiya Charm, Meranti mustahkam yog'och karkas, cho'yan metall oyoqchalar",
      kz: "100% Premium Италиялық былғары, маранти мықты ағаш қаңқасы",
      ru: "100% Премиальная итальянская кожа, каркас из массива меранти, стальные опоры",
      en: "100% Premium Italian Top-Grain Leather, Meranti solid hardwood frame, steel legs",
      zh: "意式顶级进口头层牛皮，印尼沙比利实木坚固内架，哑光碳素钢高脚"
    },
    info: {
      uz: "KUKA HOME o'zining eng murakkab texnologiyalaridan foydalangan holda yaratgan haqiqiy san'at asari. Tabiiy Italiya charmi va ultra-elastik ko'pik qatlami sizga o’zgacha qulaylik beradi. Murakkab choklari va nafis konturi bilan har qanday premium interyer asosi bo'la oladi.",
      kz: "KUKA HOME-ның ең күрделі технологияларын қолдана отырып жасалған нағыз өнер туындысы. Табиғи Италия былғарысы мен ультра серпімді көбік қабаты ерекше жайлылық береді.",
      ru: "Настоящий шедевр мебельного искусства от KUKA HOME. Благородная итальянская кожа в сочетании с запатентованной многослойной системой наполнения гарантирует статусную посадку и безупречный уровень тактильного уюта.",
      en: "A monumental design icon by KUKA. Draped in exquisite, full-aniline Italian top-grain leather, it fuses minimal geometric elegance with our patented memory-foam structural layering, creating a seat that is simultaneously supportive and clouds-soft.",
      zh: "顾家经典之作。采用珍稀意式全粒面原厂真皮，历经百道工序纯手工打磨。多密度释压高强回弹乳胶填充，深度释压，让每一次入座都如同被云朵般温柔包覆。"
    }
  },
  {
    id: "BY-736B",
    model: "BY.736B Milanese",
    category: "sofa",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80"
    ],
    dimensions: "340 x 180 x 90 cm",
    price: 4100,
    featured: true,
    newArrival: false,
    material: {
      uz: "Belgiya Bouclé matosi, o'ta chidamli elastik bog'ichlar va gipoallergen g'ovak tola",
      kz: "Бельгиялық Букле матасы, өте берік серпімді белдіктер",
      ru: "Бельгийская шелковистая рогожка Bouclé, ортопедические пружины, гипоаллергенный пух",
      en: "Belgian Silk-blend Bouclé texturized upholstery, high-tensile structural web suspension",
      zh: "比利时奢华羊毛蚕丝混纺圈圈绒，耐磨易打理，航天级高回弹微气孔结构棉"
    },
    info: {
      uz: "Milanning so'nggi dizayn trendlaridan ilhomlangan yirik burchakli divan. Yumshoq oqish tusdagi Belgiyadan keltirilgan Bouclé matosi xonaga shinamlik va havodorlik nurlarini olib keladi. Modul tizimga ega.",
      kz: "Миланның соңғы дизайн бағыттарынан шабыт алған ірі бұрышты диван. Бөлмеге сән мен жайлылық әкеледі.",
      ru: "Современный модульный угловой диван, воплощающий дух миланской мебельной выставки. Шелковистая фактурная ткань букле премиум класса наполняет комнату теплом и ощущением защищенности.",
      en: "Inspired by the ultimate milanese minimalism, this modular sectional blends rich Organic texture with cloud-like sitting comfort. Its modular design allows flexible seating shapes suited for contemporary luxury properties.",
      zh: "源于米兰展奢品概念性设计，模块化自由拼接布局。甄选触感软糯的羊毛圈圈绒面料，优雅低饱和象牙白度，兼具奢华气度与沉浸式治愈功能。"
    }
  },
  {
    id: "BY-700",
    model: "BY.700 Smart Gravity",
    category: "lounge",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=1200&q=80"
    ],
    dimensions: "105 x 90 x 110 cm",
    price: 1850,
    featured: false,
    newArrival: true,
    material: {
      uz: "Nappa yumshoq charmi, OKIN germaniya elektr motori, mustahkam metall qotishmali relslar",
      kz: "Наппа жұмсақ былғарысы, OKIN германиялық электр моторы",
      ru: "Мягкая кожа Nappa, немецкий мотор OKIN, стальной авиационный каркас",
      en: "Nappa top leather overlay, German OKIN whisper-quiet low-voltage motor, military-grade steel alloy rails",
      zh: "高奢全接触真皮真纳帕皮，德国OKIN原装进口静音微动力双电机，碳合金承重底座"
    },
    info: {
      uz: "Faqatgina o'tirish uchun emas, balki chuqur dam olish uchun ishlab chiqilgan aqlli relaks-kreslo. Germaniyaning OKIN motor texnologiyasi evaziga mutlaqo ovozsiz tarzda tanani 160 darajagacha cho'zib, Zero-Gravity (vaznsizlik) holatiga olib keladi.",
      kz: "Терең демалуға арналған ақылды релакс-кресло. Ол сізді нөлдік гравитация күйіне жеткізеді.",
      ru: "Умное кресло-реклайнер, созданное для достижения абсолютного расслабления. Немецкий электропривод OKIN плавно и бесшумно переводит кресло в ортопедически безупречное положение невесомости Zero-Gravity.",
      en: "An uncompromised smart reclining lounge experience. Powered by an elite, whisper-quiet German actuator system, it smoothly transitions you into full Zero-Gravity biomechanical support for true mind-body recovery.",
      zh: "太空舱级零重力智能单人功能沙发。德国OKIN高精控制系统，一键无级悬停舒展至160°，让身体各个关节处于自然放松无压状态，享受真正的高效深度睡眠。"
    }
  },
  {
    id: "BY-8105",
    model: "BY.8105 Sienna Crown",
    category: "bed",
    images: [
      "https://images.unsplash.com/photo-1505693395321-883724634266?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80"
    ],
    dimensions: "220 x 210 x 140 cm",
    price: 2900,
    featured: true,
    newArrival: false,
    material: {
      uz: "Yuqori darajadagi nubuk charmi, massiv qayin daraxtidan tayyorlangan mustahkam ramka va krovat tagligi",
      kz: "Жоғары деңгейлі нубук былғарысы, қайың ағашынан жасалған рамка",
      ru: "Текстурированная шлифованная кожа нубук класса люкс, ортопедическое основание из массива березы",
      en: "Luxury Nubuck ground leather, Russian birchwood structural slatted bed frame, non-slip base",
      zh: "高奢仿生磨砂麂皮绒皮，俄罗斯优质A级桦木排骨架，气动防夹安全液压气撑"
    },
    info: {
      uz: "O'zining yirik baland suyanchig'i va geometrik chiziqlari bilan shohona uyg'unlikka ega yotoqxona krovati. Elegant nubuk charmi yuzasi har qanday yotoqxonaning ko’rkiga aylanadi. Keng saqlash qutisiga ega.",
      kz: "Өзінің биік сүйенішімен патшалық үйлесімге ие жатын бөлме кереуеті. Эксклюзивті былғарымен қапталған.",
      ru: "Королевская кровать с высоким роскошным изголовьем и строгими геометрическими линиями. Мягкая бархатистая кожа нубука создает обволакивающую атмосферу нежности и защищенности в вашей спальне.",
      en: "Majestic proportions with a bold high-tufted headboard. Upholstered in premium, velvety nubuck leather, it sets a regal anchor point for your modern master suite. Equipped with a huge internal storage system.",
      zh: "意式轻奢高背悬挂皮艺双人床。灵感源自皇冠弧度，大面积填充高级磨砂感面料，尊贵沉静。搭载智能升降静音气压仓，兼备极致视觉与惊人家居收纳空间。"
    }
  },
  {
    id: "BY-5020",
    model: "BY.5020 Verona Cloud",
    category: "bed",
    images: [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1531835551805-16d864c8d311?auto=format&fit=crop&w=1200&q=80"
    ],
    dimensions: "215 x 195 x 115 cm",
    price: 2100,
    featured: false,
    newArrival: true,
    material: {
      uz: "Zararsiz eko-charm, qayin yog'ochidan o'rindiq, mustahkam po'lat burchaklar",
      kz: "Экологиялық былғары, қайыңнан жасалған негіз",
      ru: "Эко-кожа премиум класса, дышащая конструкция с ламелями, стальные скрытые крепежи",
      en: "Eco-conscious micro-grain leather base, birchwood flexible slat system, internal cold-rolled steel alignment corners",
      zh: "欧盟标准生态超纤皮，精钢蜂窝静音连接扣件，高回弹双层环保垫层"
    },
    info: {
      uz: "Uchar bulutni eslatuvchi bejirim past profilli poy-krovat. Yumshoq ekologik toza charmi va xavfsiz yumaloq burchaklari yosh bolali oilalar uchun juda mos va shinam yechimdir.",
      kz: "Аспандағы бұлтты еске түсіретін төмен профильді кереует. Жиектері жұмсақ әрі қауіпсіз етіп жасалған.",
      ru: "Изящная низкопрофильная кровать в лаконичном скандинавском исполнении. Плавные закругления углов, отсутствие травмоопасных стыков делают её фаворитом для комфортных современных пространств.",
      en: "A beautiful low-profile platform bed which mimics a floating cloud. Crafted with wrap-around premium cushioning and soft curved corners, it offers extreme baby-safe physical protection and peaceful ergonomics.",
      zh: "极简日式低重心漂浮悬挂床。圆润无棱角的防撞工艺，柔美而充满安心力。微凹式排骨架紧锁床垫，翻身无任何杂音，重构宁静治愈的睡眠港湾。"
    }
  },
  {
    id: "BY-4042",
    model: "BY.4042 Capital Table",
    category: "dining",
    images: [
      "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1200&q=80"
    ],
    dimensions: "200 x 95 x 76 cm (Stol) + 6 Stul",
    price: 3200,
    featured: true,
    newArrival: false,
    material: {
      uz: "Marmardan ishlangan yuza, zarb qilingan silliq metall ramka va Nappa charmli o'rindiqlar",
      kz: "Мәрмәр беті, темір қаңқа және былғары орындықтар",
      ru: "Высокотемпературная спеченная мраморная плита (керамогранит), стальное литое основание, стулья в коже Nappa",
      en: "Sintered Nero Marquina Marble top, electrostatic structural steel base, premium leather dining armchairs",
      zh: "劳伦黑金通体超薄岩板台面，哑光拉丝抗指纹不锈钢立柱底座，纳帕皮靠背人体工学餐椅"
    },
    info: {
      uz: "Oshxona va mehmonxona uchun ulug'vor tushlik to'plami. Chizilish va issiqlikka o'ta chidamli bo'lgan marmarsimon Nero Marquina keramo-plitasi hamda 6 ta hashamatli o'rindiqli stullarni o'z ichiga oladi.",
      kz: "Орны бөлек салтанатты ас ішетін үстел жиынтығы. Оған үстел мен 6 бірдей кресло кіреді.",
      ru: "Элитная обеденная группа для праздничных ужинов и статусных встреч. Столешница из термостойкой сверхпрочной мраморной плиты Nero Marquina устойчива к царапинам, ударам и дополняется 6 изысканными креслами.",
      en: "An executive scale dining set bringing industrial grandeur to your architectural dining hall. Features a beautiful, indestructible Italian Nero Marquina sintered stone top which is scratch-proof and hot-iron safe, plus 6 matching leather wing chairs.",
      zh: "顶级劳伦黑金高定餐桌椅套系。无惧2000℃火烤的高科技环保岩板面，防渗耐酸，硬度卓越。配套六把由意大利工匠合力打造的高定真皮靠椅，升华每一次豪门盛宴。"
    }
  },
  {
    id: "BY-1022",
    model: "BY.1022 Shell Lounge",
    category: "lounge",
    images: [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=80"
    ],
    dimensions: "85 x 85 x 95 cm",
    price: 1250,
    featured: false,
    newArrival: true,
    material: {
      uz: "Yuqori sifatli mato va guruch po'lat oyoq mexanizmi",
      kz: "Жоғары сапалы мата және жезді механизм",
      ru: "Высококачественная ткань и латунный механизм",
      en: "Molded cold-cure foam core, luxury wool blend upholstery fabric, 360° swivel brass-plated steel base",
      zh: "模压冷固化海绵内芯，豪华羊毛混纺内饰面料，360°旋转镀黄铜钢底座"
    },
    info: {
      uz: "Uyning istalgan burchagiga qo'shimcha ko'rk bag'ishlovchi fiksatsiya stuli. Aylanuvchi tizimi tufayli harakat erkinligi cheklanmagan.",
      kz: "360° айналу және тамаша белдік қолдауды қамтамасыз ететін ерекше орындық.",
      ru: "Красивый архитектурный элемент, вдохновленный геометрией раковины. Обеспечивает 360° вращение и отличную поясничную поддержку.",
      en: "A beautiful architectural statement piece inspired by the curved geometry of an oceanic shell. Seamlessly balances 360° smooth swivel action with full postural lumbar cradling.",
      zh: "一件美丽的建筑个性单品，灵感来自海洋贝壳的曲面几何排列。无缝平衡了 360°的平滑旋转功能与对全身背部姿势的完美承托。"
    }
  }
];
export const showrooms = [
  {
    id: "SR-01",
    title: {
      uz: "KUKA HOME Tashkent Grand Gallery",
      kz: "KUKA HOME Ташкент Басты Салоны",
      ru: "KUKA HOME Ташкент Гранд Галерея",
      en: "KUKA HOME Tashkent Grand Gallery",
      zh: "顾家家居塔什干至尊旗舰店"
    },
    address: {
      uz: "Toshkent shahri, Gavxar ko'chasi, 124/1",
      kz: "Ташкент қаласы, Гавхар көшесі, 124/1",
      ru: "улица Гавхар, 124/1, Ташкент",
      en: "124/1 Gavkhar Street, Tashkent, Uzbekistan",
      zh: "乌兹别克斯坦塔什干市 Gavkhar路 124/1"
    },
    phone: "+998 (90) 984-40-14",
    workingHours: {
      uz: "Dushanba - Yakshanba: 09:00 - 18:00",
      kz: "Дүйсенбі - Жексенбі: 09:00 - 18:00",
      ru: "Понедельник - Воскресенье: 09:00 - 18:00",
      en: "Monday - Sunday: 09:00 - 18:00",
      zh: "周一 至 周日：09:00 - 18:00"
    },
    mapEmbedUrl: "https://yandex.com/map-widget/v1/org/167286749357",
    yandexMapUrl: "https://yandex.com/maps/org/kuka_home/167286749357?si=6xp3der92wmdza52u5rqn8t4cg",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
  }
];

export const vacancies = [
  {
    id: "VAC-01",
    title: {
      uz: "Premium Mebel Konsultanti",
      kz: "Премиум жиһаз кеңесшісі",
      ru: "Консультант мебели премиум-класса",
      en: "Premium Showroom Sales Consultant",
      zh: "高定家具家居高级顾问"
    },
    department: {
      uz: "Sotuv va Mijozlar Tajribasi",
      kz: "Сату және қызмет көрсету",
      ru: "Продажи и обслуживание клиентов",
      en: "Sales & Customer Experience",
      zh: "零售销售部"
    },
    salary: {
      uz: "6,000,000 - 12,000,000 UZS (KPI+)",
      kz: "250,000 - 500,000 KZT (KPI+)",
      ru: "60 000 - 120 000 KZT / Эквивалент в UZS",
      en: "$500 - $1,000 + Sales Commission",
      zh: "底薪 + 高额提成 (综合年薪 12W - 24W)"
    },
    experience: {
      uz: "1-3 yil premium sotuvlar sohasida",
      kz: "1-3 жыл премиум пакет саудада",
      ru: "1-3 года в сфере премиум продаж / роскоши",
      en: "1-3 years in luxury retail or premium sales",
      zh: "1-3 年高端零售、奢侈品或定制家居销售经验"
    },
    requirements: {
      uz: [
        "O'zbek va rus tillarini mukammal bilish (ingliz tili afzallikdir)",
        "Nafis so'zlashuv, estetik qobiliyat va mijozga individual yondashuv",
        "Mebel interyeri va dizayn tendensiyalari haqida tushunchaga ega bo'lish"
      ],
      kz: [
        "Қазақ және орыс тілдерін жетік меңгеру",
        "Сыпайы сөйлесу мәдениеті және жауапкершілік",
        "Интерьер дизайнынан хабары болуы керек"
      ],
      ru: [
        "Свободное владение узбекским и русским языками (английский приветствуется)",
        "Высокие навыки делового общения, отличный эстетический вкус и грамотная речь",
        "Умение работать с клиентами сегмента Luxury и Premium"
      ],
      en: [
        "Fluent in Uzbek and Russian (English or Chinese is a powerful bonus)",
        "Stellar communication skills, polished grooming, and warm disposition",
        "Familiarity with interior design, color theory, or premium architectural layout design"
      ],
      zh: [
        "高亲和力，普通话流利（懂俄语或乌兹别克语者具有压倒性录取优势）",
        "出众的美学素养、空间敏锐度以及高奢名门贵宾一站式对口接待谈判技巧",
        "极强的自驱力、抗压能力以及高端客户关系维护能力"
      ]
    },
    responsibilities: {
      uz: [
        "Showroomga kelgan mehmonlarga premium darajada g'amxo'rlik ko'rsatish",
        "Xaridorlarning uyi va xohishiga qarab mukammal model va rang turlarini taqdim etish",
        "Sotuvdan keyingi mijoz g'amxo'rligini yuqori darajada olib borish"
      ],
      kz: [
        "Шоурумда премиум деңгейде қызмет көрсету",
        "Клиенттерге жиһаз таңдауға толық көмектесу",
        "Сатудан кейінгі қолдау жүргізу"
      ],
      ru: [
        "Встреча гостей шоурума и проведение индивидуальных презентаций коллекций",
        "Подбор мебели в строгом соответствии с запросами и дизайн-проектами покупателей",
        "Полное сопровождение сделки и поддержание долгосрочных отношений с клиентом"
      ],
      en: [
        "Welcome high-profile visitors and guide them through visual showroom narratives",
        "Collaborate with architects and designers to select custom sizes and configurations",
        "Process premium sales orders and provide absolute boutique-level aftersales care"
      ],
      zh: [
        "热情迎接展厅到访贵宾，输出高质感、故事性强的顾家家居品牌与臻品讲解",
        "深度协助室内设计师与大宅业主确定定制颜色、尺寸并精准成套输出空间美学方案",
        "全生命周期跟踪并维护名流客群，成就具有标杆价值的高奢服务体验"
      ]
    }
  },
  {
    id: "VAC-02",
    title: {
      uz: "Ichki Makon Dizayneri (Interior Designer)",
      kz: "Ішкі безендіруші дизайнер",
      ru: "Дизайнер интерьера / 3D-визуализатор",
      en: "Interior Architect & 3D Visualizer",
      zh: "定制空间主案设计师 / 3D效果图方案师"
    },
    department: {
      uz: "Dizayn laboratoriyasi",
      kz: "Дизайн зертханасы",
      ru: "Лаборатория дизайна и планирования",
      en: "Design & Projecting Laboratory",
      zh: "空间定制设计中心"
    },
    salary: {
      uz: "8,000,000 - 15,000,000 UZS",
      kz: "350,000 - 600,000 KZT",
      ru: "80 000 - 150 000 KZT / Эквивалент в UZS",
      en: "$700 - $1,300 Basic + Project Bonus",
      zh: "固定高薪 + 案提成 (综合月薪 1.5W - 3W)"
    },
    experience: {
      uz: "2+ yil mebel/interyer dizayni sohasida",
      kz: "2+ жыл жиһаз дизайнері саласында",
      ru: "От 2 лет профессионального опыта моделирования/планирования",
      en: "2+ years of professional high-end interior architecture and rendering",
      zh: "2 年以上高端硬装、别墅整装或大宅定制效果图落地经验"
    },
    requirements: {
      uz: [
        "3ds Max, AutoCAD, Corona/V-Ray dasturlarida professional darajada ishlash",
        "Zamonaviy mebel trendlarini nozik his qilish, ranglar uyg'unligini tushunish",
        "Mijozlar uylarini joyida borib o'lchash va texnik ko'nikmalar"
      ],
      kz: [
        "3ds Max, AutoCAD бағдарламаларын кәсіби деңгейде білу",
        "Заманауи үрдістерді талдай білу",
        "Өлшем алу шеберлігі және техникалық сауаттылық"
      ],
      ru: [
        "Профессиональное владение пакетами 3ds Max + Corona Render, AutoCAD",
        "Развитый художественный вкус, глубокие знания эргономики и сочетания материалов",
        "Наличие портфолио в сфере жилых интерьеров современной классики и минимализма"
      ],
      en: [
        "Expertise in 3ds Max, Corona Render, AutoCAD, and Photoshop",
        "Impressive conceptual portfolio showcasing premium modern residential designs",
        "Outstanding active-listening and design-consultation skills"
      ],
      zh: [
        "熟练驱动 3ds Max, Corona Render, AutoCAD, Kujiale (酷家乐) 等专业工具",
        "极其超群的美学感知底子，深层次精通色彩搭配及高端岩板/皮饰肌理结合方案",
        "注重落地，能够带队亲临大宅一线现场精确细化尺寸并对接高端整装工艺细节"
      ]
    },
    responsibilities: {
      uz: [
        "Mijozlarning uylari va ofislariga KUKA HOME mebellarini 3D joylashtirib berish",
        "Showroom mehmonlari uchun bepul interyer loyihalari va kollajlar tuzish",
        "Buyurtmachilar bilan to'g'ridan-to'g'ri dizayn-maslahatlar o'tkazish"
      ],
      kz: [
        "Клиенттерге KUKA HOME өнімдерімен 3D жобалар ұсыну",
        "Кеңістікті пайдалы безендіру үлгілерін құру",
        "Дизайн бойынша кеңестер беру"
      ],
      ru: [
        "Разработка 3D-коллажей и экспресс-визуализаций с мебелью KUKA HOME в интерьере клиентов",
        "Помощь покупателям в подборе идеальных габаритов, палитры и декоративных решений",
        "Выезд к ключевым клиентам на объект для выполнения точных замеров"
      ],
      en: [
        "Generate absolute-fidelity 3D renderings showcasing KUKA premium configurations in clients' homes",
        "Curate stunning layout palettes, finish swatches, and lighting directions",
        "Conduct live spatial planning consultations in showrooms or on-site"
      ],
      zh: [
        "操盘将顾家顶级意式家居全景、生动地融入客户住宅的 3D 豪宅效果图方案制备",
        "为重要客户进行定制级色彩方案搭配、沙发选型指导以及美学摆场方案汇报",
        "密切配合软装设计师、软装买手及销售战线，共同拿下大宅整装高定订单"
      ]
    }
  }
];

export const videoGallery: VideoItem[] = [
  {
    id: "v1",
    title: {
      uz: "KUKA HOME Premium mebel ishlab chiqarish estetikasi",
      kz: "KUKA HOME Жиһаз өндірісінің эстетикасы",
      ru: "Эстетика производства премиальной мебели KUKA HOME",
      en: "The Aesthetics of KUKA HOME Luxury Craftsmanship",
      zh: "顾家家居高定智造与工匠美学纪录短片"
    },
    youtubeId: "i4NFDfPTpqw", // New YouTube video URL: https://youtu.be/i4NFDfPTpqw
    duration: "2:45",
    thumbnail: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "v2",
    title: {
      uz: "O'zbekistondagi premium showroom sayohati",
      kz: "Өзбекстан премиум шоурумының шолуы",
      ru: "Тур по нашему флагманскому шоуруму в Узбекистане",
      en: "Tashkent Premium Flagship Store Showcase Tour",
      zh: "塔什干现代至尊旗舰店探店与空间鉴赏"
    },
    youtubeId: "vcNZT0EP-o0",
    duration: "4:12",
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
  }
];
