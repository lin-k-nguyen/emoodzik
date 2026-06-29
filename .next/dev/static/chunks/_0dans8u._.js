(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AUTHORS",
    ()=>AUTHORS,
    "AUTHOR_ORDER",
    ()=>AUTHOR_ORDER,
    "CATEGORIES",
    ()=>CATEGORIES,
    "POSTS",
    ()=>POSTS,
    "SERIES",
    ()=>SERIES,
    "fmtDate",
    ()=>fmtDate,
    "getAllPosts",
    ()=>getAllPosts,
    "getAuthor",
    ()=>getAuthor,
    "getCategoryByLabel",
    ()=>getCategoryByLabel,
    "getCategoryBySlug",
    ()=>getCategoryBySlug,
    "getPostBySlug",
    ()=>getPostBySlug,
    "getPostsByCategory",
    ()=>getPostsByCategory,
    "getSeriesBySlug",
    ()=>getSeriesBySlug
]);
const AUTHORS = {
    kink: {
        slug: 'kink',
        name: 'Kink',
        avatar: '/assets/authors/kink-real.png',
        role: 'Rock · Alternative',
        bio: 'Lười như lợn, trắng bóc như con lợn luộc — nghiệm ra rằng tán gái rất khó nên chuyển sang viết văn.',
        bioParas: [
            'Thằng Kink lười như lợn. Từ bé nó chả động chạm việc đếch gì trong nhà. Ông bà già nó bắt nó ra đường chơi mà nó còn không thèm thò chân ra. Thế nên người nó trắng bóc như con lợn luộc.',
            'Ở nhà riết nó càng béo và kém thể thao. Cái lần thày giáo thể dục bắt cả lớp thi cuối kỳ môn chạy bền 3 vòng quanh trường. Không cần tính giờ chỉ là cấm đúng đi bộ, mà nó vẫn thở phì phò và bị đứa con gái nó thích trong lớp bỏ xa đến nửa vòng.',
            'Hôm đó nhìn thằng hotboy trong lớp chơi patin, bọn con gái gồm cả con nó thích ngồi xem tít mắt. Nó bèn tập theo. Nhưng kể cả đó là patin ván mà với Kink, nó cũng không thăng bằng được.',
            'Ông bà già nó thấy thế động viên mua cho nó cái đài băng cát xét để nó vác ra đường chơi patin. Có cuộn băng Red Hot Chili Pepper nó mượn được của ông chú mang ra bật, nó càng khoái chăm chỉ tập hơn.',
            'Đến lúc lướt thạo rồi, nó tính đi lấy le với đứa nó thích thì thấy thằng hotboy giờ không chơi ván nữa mà lại đánh trống cho ban nhạc trường. Bọn con gái gồm cả đứa kia gào rú thích lắm. Buồn chán. Nó nghiệm ra rằng tán gái rất khó. Thế nên nó về sau chuyển sang viết văn cho EmoodziK.'
        ]
    },
    kroon: {
        slug: 'kroon',
        name: 'Kroon',
        avatar: '/assets/authors/kroon-real.png',
        role: 'Pop · Ballad',
        bio: 'Hiền lành như chị em phụ nữ chưa chồng, giọng nam cao yếu kiểu Michael Bolton — đi hát karaoke là đủ vui.',
        bioParas: [
            'Kroon là thằng hiền lành, như chị em phụ nữ chưa chồng. Từ nhỏ nó đã ngây thơ như chú cừu luôn được bao bọc vỗ về.',
            'Nó xin được mẹ nó cái máy nghe đĩa Walkman hồi đó là xịn lắm và nghe mấy cái đĩa tàu mua ngoài hàng. Vì thế mỗi tối tắt đèn, nó lại cắm tai phone vừa nghe vừa hát rên rỉ.',
            'Hát hay, hiền lành là thế. Nhưng nó không có được đứa con gái nào để ý. Một phần chắc do thiếu cá tính, và phần nhiều do nó lười tắm nên bốc mùi.',
            'Lớn lên, nó kiếm được công việc văn phòng lương dưới 2 tỷ mỗi năm. Làm cùng công ty nó là thằng Kink, lúc này đã viết bài cho EmoodziK rồi.',
            'Thế nhưng đến khi tâm sự mới biết Kroon chả nghe Swift bao giờ. Nó làm thế vì nó sợ những lúc ở nhà một mình mà mất wifi. Thế là Kink rủ Kroon vào viết cho EmoodziK luôn.'
        ]
    },
    kcid: {
        slug: 'kcid',
        name: 'Kcid',
        avatar: '/assets/authors/kcid-real.png',
        role: 'Rock · Progressive',
        bio: 'Lầm lì, hay tự oẳn tù tì tay trái với tay phải — nghiền thứ nhạc đủ ồn để cách ly với thế giới bên ngoài.',
        bioParas: [
            'Người ta vẫn nói vịt nghe sấm. Thế nên từ bé Kcid học hát ở mẫu giáo vất vả lắm. Nó hát toàn lệch tông.',
            'Hầu như nó chả chơi với ai ngoại trừ việc tự oẳn tù tì tay trái với tay phải. Cũng nhờ việc tự chơi các trò chơi giữa tay trái và tay phải mà nó sau này học đàn lại rất nhanh.',
            'Ở lớp nó cũng chả giao du với mấy ai ngoại trừ mấy anh lớp lớn chuyên nghe nhạc Rock.',
            'Cái lần nó về quê với ông bà già, nó tình cờ gặp thằng Kai chơi đàn trong xóm. Hai thằng như bạn thân từ kiếp trước.',
            'Nó lúc đó lại chưa nghĩ ra tên nghệ danh gì, thì bỗng dưng thấy có con gà tên Kunt nên nó tự chọn cho mình một cái tên. Không muốn thô tục, nó biến tấu thành Kcid.'
        ]
    },
    kai: {
        slug: 'kai',
        name: 'Kai',
        avatar: '/assets/authors/kai-real.png',
        role: 'Blues · Guitar',
        bio: 'Hai ngón tay nhưng chạy ngón không thua ai, gảy được cả bằng răng mỗi khi quên mang pick.',
        bioParas: [
            'Từ bé Kai đã phải giúp bố mẹ làm việc đồng áng nên Kai không có điều kiện đi học hành gì cả.',
            'Một ngày Kai được ông bô dẫn đi dự đám cưới trong làng. Lần này rôm rả cả ban nhạc với một tay chơi guitar điện.',
            'Kai khoái lắm! Vì nó chưa bao giờ thấy ai cầm cái đàn không có rỗng ruột và cái tay cầm dài dài.',
            'Nó chỉ đợi chú chơi xong là bám theo về đến xã. Hai thày trò như tri kỷ âm nhạc.',
            'Dù bàn tay nó có hai ngón nhưng nhờ tình yêu sét đánh với chiếc đàn guitar điện mà nó luyện chạy ngón các kiểu không thua kém bất kỳ ai.'
        ]
    },
    kunt: {
        slug: 'kunt',
        name: 'Kunt',
        avatar: '/assets/authors/kunt-real.png',
        role: 'Hip Hop · Rap',
        bio: 'Tên thật là Cun họ Chích. Mê hip hop, đeo dây bling bling pha ke và tập rap lấy le với đám con gái.',
        bioParas: [
            'Kunt tên thật là Cun họ Chích. Nên ở lớp cô giáo hay gọi là Chích Cun. Mỗi lần như thế Kunt ngượng lắm.',
            'Cái lần nó đeo dây chuyền bạc mà mẹ nó mua cho để chống bị cảm gió mà thế quái nào nó bị mấy đứa anh chị trấn lột.',
            'Một ngày trên tivi có phát quảng cáo bao cao su OK. Nó chả hiểu gì cả đâu nhưng cái bài No Limits in sâu trong đầu nó.',
            'Điều đáng mừng là từ khi nó ăn mặc phong cách hip hop và đeo dây bling bling to đùng thì chả có đứa nào ra trấn lột nữa.',
            'Yêu hip hop là vậy nhưng nó làm thơ rất kém thế nên giờ nó đành viết văn xuôi cho EmoodziK.'
        ]
    }
};
const AUTHOR_ORDER = [
    'kink',
    'kroon',
    'kcid',
    'kai',
    'kunt'
];
const CATEGORIES = [
    {
        slug: 'all',
        label: 'Tất tần tật',
        blurb: 'Tất cả bài viết trên EmoodziK.'
    },
    {
        slug: 'tong-hop',
        label: 'Tổng Hợp',
        blurb: 'Tổng kết, danh sách và những bài viết bao quát nhiều nghệ sĩ.'
    },
    {
        slug: 'quen-quen',
        label: 'Quen Quen',
        blurb: 'Những cái tên và giai điệu thân quen, nghe là thấy nhà.'
    },
    {
        slug: 'la-la',
        label: 'Lạ Lạ',
        blurb: 'Âm thanh thử nghiệm, kỳ lạ và đáng để tò mò.'
    },
    {
        slug: 'an-bum',
        label: 'Ăn Bum',
        blurb: 'Mổ xẻ trọn vẹn từng album, từ bài mở tới bài kết.'
    },
    {
        slug: 'an-view',
        label: 'Ăn View',
        blurb: 'Soi từng MV, từng đơn ca đang làm mưa làm gió.'
    }
];
const SERIES = [
    {
        slug: 'an-sau-gian-trong',
        label: 'Ẩn Sau Giàn Trống',
        blurb: 'Series tôn vinh những tay trống thầm lặng đứng sau nhịp điệu của các ban nhạc.'
    },
    {
        slug: 'tan-man',
        label: 'Tản Mạn',
        blurb: 'Những bài tản mạn, chém gió về âm nhạc và các câu chuyện xoay quanh nghề chơi nhạc.'
    }
];
const POSTS = [
    {
        slug: 'chuck-berry',
        title: "Chuck Berry, Rock 'n' Roll và âm nhạc đa sắc tộc",
        excerpt: "Cha đẻ của Rock 'n' Roll thừa nhận ông đến với thể loại này vì mưu sinh. Đằng sau đó là câu chuyện giao thoa của hai sắc tộc.",
        category: 'Quen Quen',
        image: '/assets/posts/vinyl-matters.png',
        date: '2026-04-04',
        readingTime: '14 phút đọc',
        artists: [
            'Chuck Berry',
            'Elvis Presley',
            'Louis Jordan',
            'Muddy Waters'
        ],
        author: 'kink',
        body: [
            `"Rock 'n' Roll đã đón nhận tôi và kiếm tiền cho tôi, mặc dù nhạc của Big Band mới là tình yêu đích thực… Tôi chọn con đường đó chỉ bởi vì tôi muốn có một căn nhà cho riêng mình." Đó là lời Chuck Berry nói trong một bài phỏng vấn năm 1987.`,
            `Người ta ghi nhận ông là "Cha đẻ của Rock and Roll", nhưng với Berry, việc vươn lên mưu sinh giữa một xã hội Mỹ đầy phân biệt chủng tộc mới là điều quan trọng.`,
            `Điểm khác biệt của Berry là ông tựu đủ tài năng và định hướng để lan tỏa tới cả người nghe da trắng lẫn da màu.`,
            `Trên tất cả, âm nhạc của Chuck Berry đã góp phần hàn gắn sự phân cách giữa hai sắc tộc.`
        ]
    },
    {
        slug: 'diane-warren',
        title: 'Diane Warren: Trùm không lộ diện',
        excerpt: 'Hơn 1500 bài hát, 9 ca khúc No.1, vài giải Grammy — vậy mà rất ít người biết tới người phụ nữ đứng sau những bản hit để đời.',
        category: 'Quen Quen',
        image: '/assets/posts/perfect-album.png',
        date: '2025-08-23',
        readingTime: '15 phút đọc',
        artists: [
            'Diane Warren',
            'Celine Dion',
            'Aerosmith',
            'Toni Braxton',
            'Cher'
        ],
        author: 'kink',
        body: [
            `"I Don't Want To Miss A Thing" (Aerosmith), "Because You Loved Me" (Celine Dion)… Hầu như ai cũng từng nghe một bài do Diane Warren chắp bút mà chẳng để ý ai viết.`,
            `Warren là một trong những nhạc sĩ sáng tác thành công nhất mọi thời đại, thu nhập cỡ 20 triệu đô mỗi năm.`,
            `Những bản nhạc của bà, dù là Pop, cũng thường mang nhiều hợp âm hơn bình thường, với những đoạn chuyển tông bất ngờ.`,
            `Từ Pop, Country, R&B cho tới Rock, Diane Warren chứng minh rằng cứ theo đuổi và làm hết sức, cuộc đời khắc sẽ đưa ta tới những ngả rẽ thú vị.`
        ]
    },
    {
        slug: 'one-ok-rock',
        title: 'One OK Rock: Cái giá của sự nổi tiếng',
        excerpt: 'Một ban nhạc Nhật hiếm hoi vươn ra thế giới bằng nhạc Rock. Nhưng cái giá để vào được thị trường Mỹ có lẽ không hề nhỏ.',
        category: 'Quen Quen',
        image: '/assets/posts/mixing-song.png',
        date: '2025-09-20',
        readingTime: '11 phút đọc',
        artists: [
            'One OK Rock',
            'Linkin Park',
            'Avril Lavigne'
        ],
        author: 'kcid',
        body: [
            `Họ có các cây chơi nhạc cự phách, lấp kín các sân vận động ở Nhật với một ca sĩ bùng nổ hát tiếng Anh vào loại khá nhất trong các ban nhạc xứ Phù Tang.`,
            `Với tôi, Zankyo Reference (2011) sẽ mãi là album hay nhất của họ — một thứ J-Rock nặng, thô ráp, bất cần.`,
            `Đến Eye of the Storm (2019) rồi Detox (2025), cái chất "One OK Rock" càng bị loãng dần.`,
            `Nhưng hãy nhìn về phía tích cực: cuối cùng họ cũng được chơi cùng Linkin Park.`
        ]
    },
    {
        slug: 'phoebe-bridgers',
        title: 'Những suy ngẫm của Phoebe Bridgers',
        excerpt: 'Giọng hát gần gũi đến mức chân thực, ca từ thẳng như ruột ngựa. Phoebe Bridgers biến những suy nghĩ đen tối thành thơ ca.',
        category: 'Lạ Lạ',
        image: '/assets/posts/ambient-music.png',
        date: '2026-02-22',
        readingTime: '12 phút đọc',
        artists: [
            'Phoebe Bridgers',
            'Boygenius',
            'Taylor Swift'
        ],
        author: 'kroon',
        body: [
            `Tâm trí của Phoebe Bridgers luôn bận rộn với vô vàn mạch suy nghĩ. Các giác quan của cô như những sợi dây ăng ten.`,
            `Người ta yêu nhạc của Phoebe vì ca từ đi vào chi tiết đến mức thẳng thừng.`,
            `Cùng Tony Berg và Ethan Gruska, Phoebe tạo ra thứ Indie Folk vừa mộc mạc vừa tinh tế.`,
            `Sau hai album solo, cô tìm tới Julien Baker và Lucy Dacus để lập Boygenius.`
        ]
    },
    {
        slug: 'griselda',
        title: 'Griselda: Những kẻ hồi xuân nhạc Hip Hop',
        excerpt: 'Conway the Machine, Westside Gunn và Benny the Butcher kiên trì cày cuốc thứ boom bap "cũ kỹ" để hồi sinh một nhánh Hip Hop kinh điển.',
        category: 'Lạ Lạ',
        image: '/assets/posts/field-recording.png',
        date: '2025-09-27',
        readingTime: '14 phút đọc',
        artists: [
            'Conway the Machine',
            'Westside Gunn',
            'Benny the Butcher',
            'Eminem',
            'Jay-Z'
        ],
        author: 'kunt',
        body: [
            `Khi nhạc Hip Hop ngày nay được làm kỹ lưỡng nhưng nội dung lại bị giản lược, ba anh chàng quyết khai phá vùng đất bị lãng quên.`,
            `Họ "hồi xuân" Hip Hop bằng thứ âm thanh boom bap từ cuối những năm 80, đầu 90.`,
            `Lấy tên từ nữ trùm ma túy Griselda Blanco, phong cách của họ mang đúng chuẩn mực thập niên 90.`,
            `Khoảnh khắc Raekwon trao cây micro cho Griselda trong một show năm 2017 chính là lời khẳng định sự hồi xuân.`
        ]
    },
    {
        slug: 'freeflow-ep-22-king-gizzard',
        title: 'Tản mạn (ep. 22): Band "tắc kè hoa" King Gizzard & The Lizard Wizard',
        excerpt: 'Thay đổi phong cách nhạc, nên hay không nên? Câu chuyện về ban nhạc đổi màu liên xoành xoạch mà vẫn giữ được "chất".',
        category: 'Lạ Lạ',
        series: 'tan-man',
        image: '/assets/posts/modular-synth.png',
        date: '2025-10-26',
        readingTime: '16 phút đọc',
        artists: [
            'King Gizzard & The Lizard Wizard',
            'Ed Sheeran',
            'Coldplay'
        ],
        author: 'kink',
        body: [
            `"Beauty is in the eye of the beholder" — âm nhạc của một nghệ sĩ ở mỗi thời điểm hay hay dở đều tùy thuộc vào người đánh giá.`,
            `Giống nồi nước phở vơi dần, có nghệ sĩ giữ nguyên phong cách mà vẫn "mất chất".`,
            `Và nhân vật chính là King Gizzard & the Lizard Wizard: thành lập 2010, đã ra 27 album đủ thể loại.`,
            `Cái "chất" của họ toát ra từ không gian jam ngẫu hứng cực cuốn hút.`
        ]
    },
    {
        slug: 'behind-the-drums-ep-15-gene-hoglan',
        title: 'Ẩn sau giàn trống (Ep. 15): Gene Hoglan',
        excerpt: 'Chiếc "đồng hồ nguyên tử" của nhạc Metal — người chơi chân bass đôi dày đặc mà không hề nhàm chán.',
        category: 'Lạ Lạ',
        series: 'an-sau-gian-trong',
        image: '/assets/posts/mixing-song.png',
        date: '2025-10-11',
        readingTime: '13 phút đọc',
        artists: [
            'Gene Hoglan',
            'Death',
            'Dark Angel',
            'Devin Townsend'
        ],
        author: 'kai',
        body: [
            `Các tay trống có lẽ luôn thiệt nhất trong ban nhạc về mặt hình ảnh.`,
            `Điều thú vị nhất là Gene Hoglan tự nhận mình là một sử gia về nhạc Rock.`,
            `Album Symbolic (1995) của Death có lẽ mãi là album nổi tiếng nhất anh tham gia.`,
            `Từ Death, Dark Angel, Devin Townsend, Testament cho tới Dethklok, ai đã từng biết tới Hoglan đều ngưỡng mộ.`
        ]
    },
    {
        slug: 'royce-da-5-9',
        title: `Khi Royce Da 5'9" vượt mặt Eminem`,
        excerpt: 'Sự nghiệp của Royce hẳn sẽ khác nhiều nếu anh biết điều hơn. Một hành trình qua từng album, từ kiêu ngạo tới trưởng thành.',
        category: 'Ăn Bum',
        image: '/assets/posts/mixing-song.png',
        date: '2026-03-08',
        readingTime: '17 phút đọc',
        artists: [
            `Royce Da 5'9"`,
            'Eminem',
            'Dr. Dre',
            'DJ Premier'
        ],
        author: 'kunt',
        body: [
            `Ở Detroit, ngoài Proof, Eminem dành sự nể trọng nhất cho Royce Da 5'9".`,
            `Nhưng cái tôi kiêu ngạo cùng chứng nghiện rượu khiến Royce đưa ra hàng loạt quyết định sai lầm.`,
            `Hai năm thù hằn và trầm cảm để lại album Death Is Certain (2004) đầy tăm tối nhưng chân thực.`,
            `Từ PRhyme với DJ Premier tới Layers, Book of Ryan và The Allegory, Royce liên tục nâng chuẩn.`
        ]
    },
    {
        slug: 'gamma-ray',
        title: 'Gamma Ray: Khi Kai Hansen chỉ cần được chơi nhạc',
        excerpt: 'Cha đẻ của Power Metal và hành trình qua từng album của Gamma Ray — nơi cái tánh hào sảng "mình làm được" luôn được giữ vững.',
        category: 'Ăn Bum',
        image: '/assets/posts/vinyl-matters.png',
        date: '2025-08-03',
        readingTime: '12 phút đọc',
        artists: [
            'Gamma Ray',
            'Kai Hansen',
            'Helloween',
            'Michael Kiske'
        ],
        author: 'kai',
        body: [
            `Kai Hansen có lẽ mãi luôn có vấn đề với các ca sĩ trong ban nhạc của mình.`,
            `Nếu Thrash Metal có cha đẻ là Dave Mustaine, thì Power Metal chắc chắn có Kai Hansen.`,
            `Khi không ai hát, anh tự xử luôn — và các album Land of the Free, Somewhere Out in Space đều ăn khách.`,
            `Khả năng viết nhạc đều tay trong một thể loại lúc nào cũng vui tươi là điều khiến Kai Hansen khác biệt.`
        ]
    },
    {
        slug: 'doechii',
        title: 'Doechii: Lối đi riêng hay con đường đã dọn sẵn?',
        excerpt: 'Thắng Grammy bằng một mixtape, bị gọi là "industry plant". Nhưng đằng sau là 10 năm nỗ lực và một phong cách quái không ai dọn sẵn nổi.',
        category: 'Ăn View',
        image: '/assets/posts/field-recording.png',
        date: '2025-07-19',
        readingTime: '13 phút đọc',
        artists: [
            'Doechii',
            'Kendrick Lamar',
            'SZA',
            'Tyler, The Creator'
        ],
        author: 'kunt',
        body: [
            `Tháng 2 năm 2025, Doechii được xướng tên nhận giải Album Rap hay nhất.`,
            `Nhưng thành công không tới nhanh như người ta tưởng. Cô làm nhạc từ 2014, ra mixtape đầu năm 2019.`,
            `Phong cách Doechii quái cả phần nghe lẫn phần nhìn: âm thanh "xương xẩu", giọng rap biến đổi dị hợm.`,
            `Cô hát hay, rap chất, gieo vần đa âm điêu luyện. Kể cả trên lối đi đã được dọn sẵn, Doechii vẫn tìm ra cách bước những bước đi của riêng mình.`
        ]
    },
    {
        slug: 'album-hay-2025',
        title: 'Album hay 2025',
        excerpt: 'Năm 2025 khép lại với nhiều album hấp dẫn và sự trở lại của các cây đa cây đề. Danh sách chọn lọc của EmoodziK.',
        category: 'Tổng Hợp',
        image: '/assets/posts/perfect-album.png',
        date: '2025-12-31',
        readingTime: '20 phút đọc',
        artists: [
            'Clipse',
            'The Weeknd',
            'Lady Gaga',
            'Pulp',
            'Tyler, The Creator'
        ],
        author: 'kcid',
        body: [
            `Năm 2025 khép lại với nhiều album vô cùng hấp dẫn. Điểm đặc biệt của năm chính là sự trở lại của các nghệ sĩ cây đa cây đề.`,
            `Đứng đầu danh sách là Clipse với Let God Sort Em Out — một nhạc phẩm hay xuất sắc dưới bàn tay ma thuật của Pharrell.`,
            `Hip Hop có một năm rực rỡ với Mac Miller, Tyler, The Creator, Freddie Gibbs & The Alchemist.`,
            `Từ Indie Folk của Bon Iver cho tới Blues Rock của Joanne Shaw Taylor, danh sách dài này là minh chứng cho một năm 2025 đầy ắp nhạc hay.`
        ]
    },
    {
        slug: 'x-japan-vs-babymetal',
        title: 'X Japan vs. Babymetal: Đâu là công thức thành công cho Metal Nhật?',
        excerpt: 'Hai ban nhạc từ hai thế hệ, hai con đường khác nhau ra thế giới. Vài quan sát về điểm giống và khác giữa tượng đài và hiện tượng.',
        category: 'Tổng Hợp',
        image: '/assets/posts/modular-synth.png',
        date: '2025-07-13',
        readingTime: '14 phút đọc',
        artists: [
            'X Japan',
            'Babymetal',
            'Yoshiki',
            'Loudness'
        ],
        author: 'kai',
        body: [
            `X Japan gắn liền với thời trẻ của không ít fan nhạc Rock ở Việt Nam.`,
            `Bản "No Rain, No Rainbow" của Babymetal khiến tôi nhớ tới "Say Anything" của X Japan.`,
            `X Japan giàu ảnh hưởng ở Nhật nhưng chật vật vươn ra thế giới, phần vì rào cản ngôn ngữ.`,
            `Một bên là ban nhạc "original" với 5 thành viên chơi nhạc thượng thừa, bên kia là một sản phẩm "lắp ghép".`
        ]
    }
];
function getAllPosts() {
    return [
        ...POSTS
    ].sort((a, b)=>a.date < b.date ? 1 : -1);
}
function getPostsByCategory(slug) {
    if (slug === 'all') return getAllPosts();
    const label = CATEGORIES.find((c)=>c.slug === slug)?.label;
    return getAllPosts().filter((p)=>p.category === label);
}
function getCategoryBySlug(slug) {
    return CATEGORIES.find((c)=>c.slug === slug);
}
function getCategoryByLabel(label) {
    return CATEGORIES.find((c)=>c.label === label);
}
function getSeriesBySlug(slug) {
    return SERIES.find((s)=>s.slug === slug);
}
function getPostBySlug(slug) {
    return POSTS.find((p)=>p.slug === slug);
}
function getAuthor(slug) {
    return AUTHORS[slug];
}
function fmtDate(d) {
    try {
        return new Date(d).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch  {
        return d;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function Header({ onSearchOpen }) {
    _s();
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            if (menuOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
            return ({
                "Header.useEffect": ()=>{
                    document.body.style.overflow = '';
                }
            })["Header.useEffect"];
        }
    }["Header.useEffect"], [
        menuOpen
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                style: {
                    position: 'sticky',
                    top: 0,
                    zIndex: 50,
                    borderBottom: '1px solid var(--border)',
                    background: 'color-mix(in oklab,var(--bg) 80%,transparent)',
                    backdropFilter: 'blur(12px)'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        margin: '0 auto',
                        maxWidth: 1280,
                        display: 'flex',
                        height: 64,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 16,
                        padding: '0 24px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            style: {
                                fontFamily: 'var(--font-serif)',
                                fontSize: 28,
                                fontWeight: 600,
                                letterSpacing: '-.02em',
                                color: 'var(--fg)',
                                textDecoration: 'none'
                            },
                            children: [
                                "Emoodzi",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: 'var(--brand)'
                                    },
                                    children: "K"
                                }, void 0, false, {
                                    fileName: "[project]/components/Header.tsx",
                                    lineNumber: 38,
                                    columnNumber: 20
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Header.tsx",
                            lineNumber: 37,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "desk",
                            style: {
                                alignItems: 'center',
                                gap: 24
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/music-blog",
                                    style: navLink,
                                    children: "Music Blog"
                                }, void 0, false, {
                                    fileName: "[project]/components/Header.tsx",
                                    lineNumber: 43,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/series",
                                    style: navLink,
                                    children: "Series"
                                }, void 0, false, {
                                    fileName: "[project]/components/Header.tsx",
                                    lineNumber: 44,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/nghe-si",
                                    style: navLink,
                                    children: "Nghệ Sĩ"
                                }, void 0, false, {
                                    fileName: "[project]/components/Header.tsx",
                                    lineNumber: 45,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/bon-nay",
                                    style: navLink,
                                    children: "Bọn Này"
                                }, void 0, false, {
                                    fileName: "[project]/components/Header.tsx",
                                    lineNumber: 46,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: onSearchOpen,
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        fontSize: 14,
                                        color: 'var(--muted-fg)',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontFamily: 'inherit',
                                        padding: '7px 12px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '.05em',
                                        fontWeight: 500
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            width: "16",
                                            height: "16",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            stroke: "currentColor",
                                            strokeWidth: "2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                    cx: "11",
                                                    cy: "11",
                                                    r: "8"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Header.tsx",
                                                    lineNumber: 53,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "m21 21-4.3-4.3"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Header.tsx",
                                                    lineNumber: 53,
                                                    columnNumber: 49
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/Header.tsx",
                                            lineNumber: 52,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Tìm Kiếm"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Header.tsx",
                                            lineNumber: 55,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Header.tsx",
                                    lineNumber: 47,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Header.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mob",
                            style: {
                                alignItems: 'center',
                                gap: 4
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: onSearchOpen,
                                    "aria-label": "Tìm kiếm",
                                    style: iconBtn,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "20",
                                        height: "20",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        stroke: "currentColor",
                                        strokeWidth: "2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                cx: "11",
                                                cy: "11",
                                                r: "8"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Header.tsx",
                                                lineNumber: 63,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "m21 21-4.3-4.3"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Header.tsx",
                                                lineNumber: 63,
                                                columnNumber: 49
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Header.tsx",
                                        lineNumber: 62,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/Header.tsx",
                                    lineNumber: 61,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setMenuOpen((v)=>!v),
                                    "aria-label": "Menu",
                                    style: iconBtn,
                                    children: menuOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "20",
                                        height: "20",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        stroke: "currentColor",
                                        strokeWidth: "2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M18 6 6 18M6 6l12 12"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Header.tsx",
                                            lineNumber: 68,
                                            columnNumber: 117
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Header.tsx",
                                        lineNumber: 68,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "20",
                                        height: "20",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        stroke: "currentColor",
                                        strokeWidth: "2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M4 12h16M4 6h16M4 18h16"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Header.tsx",
                                            lineNumber: 69,
                                            columnNumber: 117
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Header.tsx",
                                        lineNumber: 69,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/Header.tsx",
                                    lineNumber: 66,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Header.tsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Header.tsx",
                    lineNumber: 31,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Header.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            menuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mob mobile-menu-overlay",
                style: {
                    position: 'fixed',
                    inset: 0,
                    zIndex: 60,
                    background: 'var(--bg)',
                    flexDirection: 'column',
                    overflowY: 'auto'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            height: 64,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0 24px',
                            borderBottom: '1px solid var(--border)',
                            flexShrink: 0
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                onClick: ()=>setMenuOpen(false),
                                style: {
                                    fontFamily: 'var(--font-serif)',
                                    fontSize: 28,
                                    fontWeight: 600,
                                    color: 'var(--fg)',
                                    textDecoration: 'none'
                                },
                                children: [
                                    "Emoodzi",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: 'var(--brand)'
                                        },
                                        children: "K"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Header.tsx",
                                        lineNumber: 91,
                                        columnNumber: 22
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Header.tsx",
                                lineNumber: 90,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setMenuOpen(false),
                                "aria-label": "Đóng menu",
                                style: iconBtn,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "22",
                                    height: "22",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M18 6 6 18M6 6l12 12"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Header.tsx",
                                        lineNumber: 94,
                                        columnNumber: 113
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/Header.tsx",
                                    lineNumber: 94,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/Header.tsx",
                                lineNumber: 93,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Header.tsx",
                        lineNumber: 85,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        style: {
                            flex: 1,
                            padding: '24px 24px 40px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 0
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    margin: '0 0 8px',
                                    fontSize: 11,
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    letterSpacing: '.15em',
                                    color: 'var(--muted-fg)'
                                },
                                children: "Music Blog"
                            }, void 0, false, {
                                fileName: "[project]/components/Header.tsx",
                                lineNumber: 100,
                                columnNumber: 13
                            }, this),
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORIES"].map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: cat.slug === 'all' ? '/music-blog' : `/the-loai/${cat.slug}`,
                                    onClick: ()=>setMenuOpen(false),
                                    style: {
                                        padding: '12px 0',
                                        fontSize: 18,
                                        fontFamily: 'var(--font-serif)',
                                        fontWeight: 500,
                                        color: 'var(--fg)',
                                        textDecoration: 'none',
                                        borderBottom: '1px solid var(--border)'
                                    },
                                    children: cat.label
                                }, cat.slug, false, {
                                    fileName: "[project]/components/Header.tsx",
                                    lineNumber: 102,
                                    columnNumber: 15
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    margin: '24px 0 8px',
                                    fontSize: 11,
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    letterSpacing: '.15em',
                                    color: 'var(--muted-fg)'
                                },
                                children: "Series"
                            }, void 0, false, {
                                fileName: "[project]/components/Header.tsx",
                                lineNumber: 108,
                                columnNumber: 13
                            }, this),
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SERIES"].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/series/${s.slug}`,
                                    onClick: ()=>setMenuOpen(false),
                                    style: {
                                        padding: '12px 0',
                                        fontSize: 18,
                                        fontFamily: 'var(--font-serif)',
                                        fontWeight: 500,
                                        color: 'var(--fg)',
                                        textDecoration: 'none',
                                        borderBottom: '1px solid var(--border)'
                                    },
                                    children: s.label
                                }, s.slug, false, {
                                    fileName: "[project]/components/Header.tsx",
                                    lineNumber: 110,
                                    columnNumber: 15
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginTop: 24,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/nghe-si",
                                        onClick: ()=>setMenuOpen(false),
                                        style: {
                                            padding: '12px 0',
                                            fontSize: 18,
                                            fontFamily: 'var(--font-serif)',
                                            fontWeight: 500,
                                            color: 'var(--fg)',
                                            textDecoration: 'none',
                                            borderBottom: '1px solid var(--border)'
                                        },
                                        children: "Nghệ Sĩ"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Header.tsx",
                                        lineNumber: 117,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/bon-nay",
                                        onClick: ()=>setMenuOpen(false),
                                        style: {
                                            padding: '12px 0',
                                            fontSize: 18,
                                            fontFamily: 'var(--font-serif)',
                                            fontWeight: 500,
                                            color: 'var(--fg)',
                                            textDecoration: 'none',
                                            borderBottom: '1px solid var(--border)'
                                        },
                                        children: "Bọn Này"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Header.tsx",
                                        lineNumber: 121,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Header.tsx",
                                lineNumber: 116,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/newsletter",
                                onClick: ()=>setMenuOpen(false),
                                style: {
                                    marginTop: 32,
                                    background: 'var(--primary)',
                                    padding: '14px 16px',
                                    textAlign: 'center',
                                    fontSize: 15,
                                    fontWeight: 600,
                                    color: 'var(--primary-fg)',
                                    textDecoration: 'none',
                                    borderRadius: '9999px'
                                },
                                children: "Subscribe"
                            }, void 0, false, {
                                fileName: "[project]/components/Header.tsx",
                                lineNumber: 127,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Header.tsx",
                        lineNumber: 99,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Header.tsx",
                lineNumber: 78,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(Header, "YpXa3kgiBOFhFYWp8S78i7Nbdv8=");
_c = Header;
const navLink = {
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    color: 'var(--muted-fg)',
    textDecoration: 'none',
    padding: '7px 12px'
};
const iconBtn = {
    display: 'flex',
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    color: 'var(--fg)',
    cursor: 'pointer'
};
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Footer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
;
function Footer() {
    const year = new Date().getFullYear();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        style: {
            borderTop: '1px solid var(--border)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    margin: '0 auto',
                    maxWidth: 1280,
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 24,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '48px 24px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                style: {
                                    fontFamily: 'var(--font-serif)',
                                    fontSize: 20,
                                    fontWeight: 600,
                                    letterSpacing: '-.02em',
                                    color: 'var(--fg)',
                                    textDecoration: 'none'
                                },
                                children: [
                                    "Emoodzi",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: 'var(--brand)'
                                        },
                                        children: "K"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.tsx",
                                        lineNumber: 10,
                                        columnNumber: 20
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Footer.tsx",
                                lineNumber: 9,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    margin: '8px 0 0',
                                    maxWidth: 320,
                                    fontSize: 14,
                                    lineHeight: 1.6,
                                    color: 'var(--muted-fg)'
                                },
                                children: "Blog âm nhạc về đĩa, gear và nghệ thuật lắng nghe."
                            }, void 0, false, {
                                fileName: "[project]/components/Footer.tsx",
                                lineNumber: 12,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Footer.tsx",
                        lineNumber: 8,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8
                        },
                        children: [
                            {
                                href: 'https://twitter.com',
                                label: 'X',
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M18.9 1.2h3.7l-8 9.1 9.4 12.5h-7.4l-5.8-7.6-6.6 7.6H.5l8.5-9.8L0 1.2h7.6l5.2 6.9 6.1-6.9Zm-1.3 19.5h2L6.5 3.3H4.3L17.6 20.7Z"
                                }, void 0, false, {
                                    fileName: "[project]/components/Footer.tsx",
                                    lineNumber: 18,
                                    columnNumber: 62
                                }, this)
                            },
                            {
                                href: 'https://linkedin.com',
                                label: 'LinkedIn',
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M20.4 20.4h-3.6v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2ZM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2Zm1.8 13H3.4V9h3.7v11.4ZM22.2 0H1.8C.8 0 0 .8 0 1.7v20.5c0 1 .8 1.8 1.8 1.8h20.4c1 0 1.8-.8 1.8-1.8V1.7c0-1-.8-1.7-1.8-1.7Z"
                                }, void 0, false, {
                                    fileName: "[project]/components/Footer.tsx",
                                    lineNumber: 19,
                                    columnNumber: 70
                                }, this)
                            },
                            {
                                href: 'https://facebook.com',
                                label: 'Facebook',
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.6 4.5-4.6 1.3 0 2.6.2 2.6.2v2.9h-1.5c-1.4 0-1.9.9-1.9 1.8V12h3.3l-.5 3.5h-2.8v8.4A12 12 0 0 0 24 12Z"
                                }, void 0, false, {
                                    fileName: "[project]/components/Footer.tsx",
                                    lineNumber: 20,
                                    columnNumber: 70
                                }, this)
                            },
                            {
                                href: 'https://instagram.com',
                                label: 'Instagram',
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.3-.1 1.7-.1 4.9-.1Zm0 5.6a4.2 4.2 0 1 0 0 8.4 4.2 4.2 0 0 0 0-8.4Zm0 6.9a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Zm5.3-7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
                                }, void 0, false, {
                                    fileName: "[project]/components/Footer.tsx",
                                    lineNumber: 21,
                                    columnNumber: 72
                                }, this)
                            }
                        ].map(({ href, label, icon })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: href,
                                target: "_blank",
                                rel: "noreferrer",
                                "aria-label": label,
                                style: {
                                    display: 'flex',
                                    width: 40,
                                    height: 40,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '1px solid var(--border)',
                                    color: 'var(--muted-fg)',
                                    textDecoration: 'none'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "16",
                                    height: "16",
                                    viewBox: "0 0 24 24",
                                    fill: "currentColor",
                                    children: icon
                                }, void 0, false, {
                                    fileName: "[project]/components/Footer.tsx",
                                    lineNumber: 24,
                                    columnNumber: 15
                                }, this)
                            }, label, false, {
                                fileName: "[project]/components/Footer.tsx",
                                lineNumber: 23,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/Footer.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Footer.tsx",
                lineNumber: 7,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    borderTop: '1px solid var(--border)'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        margin: '0 auto',
                        maxWidth: 1280,
                        padding: 24
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            margin: 0,
                            fontSize: 12,
                            color: 'var(--muted-fg)'
                        },
                        children: [
                            "© ",
                            year,
                            " EmoodziK. All rights reserved."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Footer.tsx",
                        lineNumber: 31,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/Footer.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Footer.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Footer.tsx",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
_c = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/sanity.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "client",
    ()=>client,
    "getAllAuthors",
    ()=>getAllAuthors,
    "getAllCategories",
    ()=>getAllCategories,
    "getAllPosts",
    ()=>getAllPosts,
    "getAllSeries",
    ()=>getAllSeries,
    "getAuthorBySlug",
    ()=>getAuthorBySlug,
    "getImageUrl",
    ()=>getImageUrl,
    "getPostBySlug",
    ()=>getPostBySlug,
    "getPostsByAuthor",
    ()=>getPostsByAuthor,
    "getPostsByCategory",
    ()=>getPostsByCategory,
    "getPostsBySeries",
    ()=>getPostsBySeries,
    "urlFor",
    ()=>urlFor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$client$2f$dist$2f$index$2e$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@sanity/client/dist/index.browser.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$image$2d$url$2f$lib$2f$_chunks$2d$es$2f$compat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@sanity/image-url/lib/_chunks-es/compat.js [app-client] (ecmascript)");
;
;
const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$client$2f$dist$2f$index$2e$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])({
    projectId: ("TURBOPACK compile-time value", "22wk7h4m"),
    dataset: ("TURBOPACK compile-time value", "production"),
    apiVersion: '2024-01-01',
    useCdn: true,
    token: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.SANITY_API_TOKEN
});
const builder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$image$2d$url$2f$lib$2f$_chunks$2d$es$2f$compat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createImageUrlBuilder"])(client);
function urlFor(source) {
    return builder.image(source);
}
function getImageUrl(post, width = 800, height = 450) {
    if (post?.mainImage) {
        return urlFor(post.mainImage).width(width).height(height).url();
    }
    if (post?.mainImageUrl) {
        return post.mainImageUrl;
    }
    return null;
}
async function getAllPosts() {
    return client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id, title, slug, excerpt, publishedAt,
      mainImage, mainImageUrl, category->{title, slug},
      series->{title, slug},
      author->{name, slug, avatar},
      artists[]->{name, slug},
      body
    }
  `);
}
async function getPostBySlug(slug) {
    return client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, excerpt, publishedAt,
      mainImage, mainImageUrl, category->{title, slug},
      series->{title, slug},
      author->{name, slug, avatar, about},
      artists[]->{name, slug},
      body, seoTitle, seoDescription
    }
  `, {
        slug
    });
}
async function getAllAuthors() {
    return client.fetch(`
    *[_type == "author"] | order(name asc) {
      _id, name, slug, avatar, about
    }
  `);
}
async function getAllCategories() {
    return client.fetch(`
    *[_type == "category"] | order(title asc) {
      _id, title, slug, description
    }
  `);
}
async function getAllSeries() {
    return client.fetch(`
    *[_type == "series"] | order(title asc) {
      _id, title, slug, description
    }
  `);
}
async function getPostsByCategory(categorySlug) {
    return client.fetch(`
    *[_type == "post" && category->slug.current == $categorySlug] | order(publishedAt desc) {
      _id, title, slug, excerpt, publishedAt,
      mainImage, mainImageUrl, category->{title, slug},
      author->{name, slug, avatar}
    }
  `, {
        categorySlug
    });
}
async function getPostsBySeries(seriesSlug) {
    return client.fetch(`
    *[_type == "post" && series->slug.current == $seriesSlug] | order(publishedAt desc) {
      _id, title, slug, excerpt, publishedAt,
      mainImage, mainImageUrl, series->{title, slug},
      author->{name, slug, avatar}
    }
  `, {
        seriesSlug
    });
}
async function getAuthorBySlug(slug) {
    return client.fetch(`
    *[_type == "author" && slug.current == $slug][0] {
      _id, name, slug, avatar, about
    }
  `, {
        slug
    });
}
async function getPostsByAuthor(authorSlug) {
    return client.fetch(`
    *[_type == "post" && author->slug.current == $authorSlug] | order(publishedAt desc) {
      _id, title, slug, excerpt, publishedAt,
      mainImage, mainImageUrl, category->{title, slug},
      author->{name, slug, avatar}
    }
  `, {
        authorSlug
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/SearchDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SearchDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sanity$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/sanity.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function SearchDialog({ onClose }) {
    _s();
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [allPosts, setAllPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SearchDialog.useEffect": ()=>{
            inputRef.current?.focus();
            const onKey = {
                "SearchDialog.useEffect.onKey": (e)=>{
                    if (e.key === 'Escape') onClose();
                }
            }["SearchDialog.useEffect.onKey"];
            window.addEventListener('keydown', onKey);
            return ({
                "SearchDialog.useEffect": ()=>window.removeEventListener('keydown', onKey)
            })["SearchDialog.useEffect"];
        }
    }["SearchDialog.useEffect"], [
        onClose
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SearchDialog.useEffect": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sanity$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["client"].fetch(`*[_type == "post"] | order(publishedAt desc) {
      _id, title, slug, excerpt, mainImage,
      category->{title, slug},
      author->{name},
      artists[]->{name}
    }`).then(setAllPosts);
        }
    }["SearchDialog.useEffect"], []);
    const results = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SearchDialog.useMemo[results]": ()=>{
            const q = query.trim().toLowerCase();
            if (!q) return [];
            return allPosts.filter({
                "SearchDialog.useMemo[results]": (p)=>{
                    const artists = p.artists?.map({
                        "SearchDialog.useMemo[results]": (a)=>a.name
                    }["SearchDialog.useMemo[results]"]).join(' ') ?? '';
                    return [
                        p.title,
                        p.excerpt,
                        p.category?.title,
                        p.author?.name,
                        artists
                    ].join(' ').toLowerCase().includes(q);
                }
            }["SearchDialog.useMemo[results]"]);
        }
    }["SearchDialog.useMemo[results]"], [
        query,
        allPosts
    ]);
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (query.trim()) {
            onClose();
            router.push(`/tim-kiem?q=${encodeURIComponent(query.trim())}`);
        }
    };
    const q = query.trim();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "dialog",
        "aria-modal": "true",
        style: {
            position: 'fixed',
            inset: 0,
            zIndex: 60,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: 16
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: onClose,
                style: {
                    position: 'absolute',
                    inset: 0,
                    background: 'color-mix(in oklab,var(--fg) 40%,transparent)',
                    backdropFilter: 'blur(4px)'
                }
            }, void 0, false, {
                fileName: "[project]/components/SearchDialog.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'relative',
                    marginTop: '8vh',
                    width: '100%',
                    maxWidth: 576,
                    overflow: 'hidden',
                    border: '1px solid var(--border)',
                    background: 'var(--bg)',
                    boxShadow: '0 30px 60px rgba(0,0,0,.35)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleSubmit,
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            borderBottom: '1px solid var(--border)',
                            padding: '0 16px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "20",
                                height: "20",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "2",
                                style: {
                                    flex: 'none',
                                    color: 'var(--muted-fg)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: "11",
                                        cy: "11",
                                        r: "8"
                                    }, void 0, false, {
                                        fileName: "[project]/components/SearchDialog.tsx",
                                        lineNumber: 61,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "m21 21-4.3-4.3"
                                    }, void 0, false, {
                                        fileName: "[project]/components/SearchDialog.tsx",
                                        lineNumber: 61,
                                        columnNumber: 45
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/SearchDialog.tsx",
                                lineNumber: 60,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                ref: inputRef,
                                type: "text",
                                value: query,
                                onChange: (e)=>setQuery(e.target.value),
                                placeholder: "Tìm bài viết, nghệ sĩ, chuyên mục...",
                                style: {
                                    height: 56,
                                    width: '100%',
                                    background: 'transparent',
                                    border: 'none',
                                    fontSize: 16,
                                    color: 'var(--fg)',
                                    outline: 'none',
                                    fontFamily: 'inherit'
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/SearchDialog.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onClose,
                                "aria-label": "Đóng",
                                style: {
                                    display: 'flex',
                                    width: 32,
                                    height: 32,
                                    flex: 'none',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--muted-fg)',
                                    cursor: 'pointer'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "16",
                                    height: "16",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M18 6 6 18M6 6l12 12"
                                    }, void 0, false, {
                                        fileName: "[project]/components/SearchDialog.tsx",
                                        lineNumber: 72,
                                        columnNumber: 111
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/SearchDialog.tsx",
                                    lineNumber: 72,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/SearchDialog.tsx",
                                lineNumber: 71,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/SearchDialog.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            maxHeight: '60vh',
                            overflowY: 'auto',
                            padding: 8
                        },
                        children: results.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            style: {
                                listStyle: 'none',
                                margin: 0,
                                padding: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 4
                            },
                            children: results.slice(0, 6).map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/posts/${p.slug.current}`,
                                        onClick: onClose,
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 16,
                                            padding: '12px 14px',
                                            textDecoration: 'none'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    position: 'relative',
                                                    width: 56,
                                                    height: 56,
                                                    flex: 'none',
                                                    overflow: 'hidden',
                                                    background: 'var(--secondary)'
                                                },
                                                children: p.mainImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sanity$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["urlFor"])(p.mainImage).width(112).height(112).url(),
                                                    alt: p.title,
                                                    fill: true,
                                                    style: {
                                                        objectFit: 'cover'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/components/SearchDialog.tsx",
                                                    lineNumber: 83,
                                                    columnNumber: 39
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/SearchDialog.tsx",
                                                lineNumber: 82,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    minWidth: 0
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            margin: 0,
                                                            fontSize: 12,
                                                            fontWeight: 500,
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '.05em',
                                                            color: 'var(--brand)'
                                                        },
                                                        children: p.category?.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/SearchDialog.tsx",
                                                        lineNumber: 86,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            margin: 0,
                                                            fontWeight: 500,
                                                            color: 'var(--fg)',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            whiteSpace: 'nowrap'
                                                        },
                                                        children: p.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/SearchDialog.tsx",
                                                        lineNumber: 87,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            margin: 0,
                                                            fontSize: 14,
                                                            color: 'var(--muted-fg)',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            whiteSpace: 'nowrap'
                                                        },
                                                        children: p.excerpt
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/SearchDialog.tsx",
                                                        lineNumber: 88,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/SearchDialog.tsx",
                                                lineNumber: 85,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/SearchDialog.tsx",
                                        lineNumber: 81,
                                        columnNumber: 19
                                    }, this)
                                }, p._id, false, {
                                    fileName: "[project]/components/SearchDialog.tsx",
                                    lineNumber: 80,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/SearchDialog.tsx",
                            lineNumber: 78,
                            columnNumber: 13
                        }, this) : q ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                padding: '40px 16px',
                                textAlign: 'center',
                                fontSize: 14,
                                color: 'var(--muted-fg)'
                            },
                            children: [
                                "Không tìm thấy bài viết nào cho “",
                                query,
                                "”"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/SearchDialog.tsx",
                            lineNumber: 95,
                            columnNumber: 13
                        }, this) : null
                    }, void 0, false, {
                        fileName: "[project]/components/SearchDialog.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this),
                    results.length > 6 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: `/tim-kiem?q=${encodeURIComponent(q)}`,
                        onClick: onClose,
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 8,
                            borderTop: '1px solid var(--border)',
                            padding: 16,
                            fontSize: 14,
                            fontWeight: 500,
                            color: 'var(--brand)',
                            textDecoration: 'none'
                        },
                        children: [
                            "Xem tất cả ",
                            results.length,
                            " kết quả",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "15",
                                height: "15",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M5 12h14M12 5l7 7-7 7"
                                }, void 0, false, {
                                    fileName: "[project]/components/SearchDialog.tsx",
                                    lineNumber: 104,
                                    columnNumber: 111
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/SearchDialog.tsx",
                                lineNumber: 104,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/SearchDialog.tsx",
                        lineNumber: 102,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/SearchDialog.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/SearchDialog.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
_s(SearchDialog, "T75wH0AlS6u1e6cUtVILpHRl480=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = SearchDialog;
var _c;
__turbopack_context__.k.register(_c, "SearchDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/MessengerWidget.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MessengerWidget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function MessengerWidget() {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'fixed',
            right: 24,
            bottom: 24,
            zIndex: 56,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 14
        },
        children: [
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: 328,
                    maxWidth: 'calc(100vw - 48px)',
                    overflow: 'hidden',
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    boxShadow: '0 24px 60px rgba(0,0,0,.32)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            padding: 16,
                            background: 'linear-gradient(135deg,#0a7cff,#a033ff)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    display: 'flex',
                                    width: 40,
                                    height: 40,
                                    flex: 'none',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '9999px',
                                    background: 'rgba(255,255,255,.18)'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MessengerIcon, {
                                    size: 24,
                                    color: "#fff"
                                }, void 0, false, {
                                    fileName: "[project]/components/MessengerWidget.tsx",
                                    lineNumber: 15,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/MessengerWidget.tsx",
                                lineNumber: 14,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    minWidth: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            margin: 0,
                                            fontSize: 15,
                                            fontWeight: 600,
                                            color: '#fff'
                                        },
                                        children: "EmoodziK"
                                    }, void 0, false, {
                                        fileName: "[project]/components/MessengerWidget.tsx",
                                        lineNumber: 18,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            margin: '2px 0 0',
                                            fontSize: 12,
                                            color: 'rgba(255,255,255,.85)'
                                        },
                                        children: "Thường trả lời trong vài giờ"
                                    }, void 0, false, {
                                        fileName: "[project]/components/MessengerWidget.tsx",
                                        lineNumber: 19,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/MessengerWidget.tsx",
                                lineNumber: 17,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setOpen(false),
                                "aria-label": "Đóng",
                                style: {
                                    display: 'flex',
                                    width: 30,
                                    height: 30,
                                    flex: 'none',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: 'none',
                                    borderRadius: '9999px',
                                    background: 'rgba(255,255,255,.18)',
                                    color: '#fff',
                                    cursor: 'pointer'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "16",
                                    height: "16",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M18 6 6 18M6 6l12 12"
                                    }, void 0, false, {
                                        fileName: "[project]/components/MessengerWidget.tsx",
                                        lineNumber: 22,
                                        columnNumber: 113
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/MessengerWidget.tsx",
                                    lineNumber: 22,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/MessengerWidget.tsx",
                                lineNumber: 21,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MessengerWidget.tsx",
                        lineNumber: 13,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: '20px 16px',
                            background: 'var(--secondary)'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                maxWidth: 240,
                                padding: '12px 14px',
                                borderRadius: '4px 16px 16px 16px',
                                background: 'var(--bg)',
                                border: '1px solid var(--border)'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    margin: 0,
                                    fontSize: 14,
                                    lineHeight: 1.5,
                                    color: 'var(--fg)'
                                },
                                children: "Chào bạn! 👋 Bọn mình có thể giúp gì cho bạn về âm nhạc, bài viết hay gear không?"
                            }, void 0, false, {
                                fileName: "[project]/components/MessengerWidget.tsx",
                                lineNumber: 29,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/MessengerWidget.tsx",
                            lineNumber: 28,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/MessengerWidget.tsx",
                        lineNumber: 27,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: '14px 16px',
                            borderTop: '1px solid var(--border)',
                            background: 'var(--bg)'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "https://m.me/emoodzik",
                            target: "_blank",
                            rel: "noreferrer",
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 10,
                                height: 46,
                                borderRadius: '9999px',
                                background: '#0a7cff',
                                color: '#fff',
                                fontSize: 14,
                                fontWeight: 600,
                                textDecoration: 'none'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MessengerIcon, {
                                    size: 20,
                                    color: "#fff"
                                }, void 0, false, {
                                    fileName: "[project]/components/MessengerWidget.tsx",
                                    lineNumber: 43,
                                    columnNumber: 15
                                }, this),
                                "Tiếp tục trên Messenger"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/MessengerWidget.tsx",
                            lineNumber: 37,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/MessengerWidget.tsx",
                        lineNumber: 36,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/MessengerWidget.tsx",
                lineNumber: 11,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>setOpen((v)=>!v),
                "aria-label": "Mở chat Messenger",
                className: "fab",
                style: {
                    display: 'flex',
                    width: 60,
                    height: 60,
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    borderRadius: '9999px',
                    background: '#0084ff',
                    color: '#fff',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,.25)'
                },
                children: open ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    width: "22",
                    height: "22",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "#fff",
                    strokeWidth: "2.4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M18 6 6 18M6 6l12 12"
                    }, void 0, false, {
                        fileName: "[project]/components/MessengerWidget.tsx",
                        lineNumber: 59,
                        columnNumber: 105
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/MessengerWidget.tsx",
                    lineNumber: 59,
                    columnNumber: 13
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MessengerIcon, {
                    size: 30,
                    color: "#fff"
                }, void 0, false, {
                    fileName: "[project]/components/MessengerWidget.tsx",
                    lineNumber: 60,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/MessengerWidget.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/MessengerWidget.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_s(MessengerWidget, "xG1TONbKtDWtdOTrXaTAsNhPg/Q=");
_c = MessengerWidget;
function MessengerIcon({ size, color }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: color,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M12 2C6.5 2 2 6.13 2 11.2c0 2.9 1.43 5.48 3.67 7.17V22l3.35-1.84c.89.25 1.84.38 2.98.38 5.5 0 10-4.13 10-9.2S17.5 2 12 2Zm1.02 12.38-2.55-2.72-4.97 2.72 5.47-5.8 2.61 2.72 4.91-2.72-5.47 5.8Z"
        }, void 0, false, {
            fileName: "[project]/components/MessengerWidget.tsx",
            lineNumber: 70,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/MessengerWidget.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
_c1 = MessengerIcon;
var _c, _c1;
__turbopack_context__.k.register(_c, "MessengerWidget");
__turbopack_context__.k.register(_c1, "MessengerIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/layout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Footer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SearchDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/SearchDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MessengerWidget$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/MessengerWidget.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function RootLayout({ children }) {
    _s();
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('dark');
    const [searchOpen, setSearchOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RootLayout.useEffect": ()=>{
            try {
                const t = localStorage.getItem('ek-theme');
                if (t) setTheme(t);
            } catch  {}
        }
    }["RootLayout.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RootLayout.useEffect": ()=>{
            document.documentElement.setAttribute('data-theme', theme);
            try {
                localStorage.setItem('ek-theme', theme);
            } catch  {}
        }
    }["RootLayout.useEffect"], [
        theme
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: "vi",
        "data-theme": theme,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("head", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        charSet: "utf-8"
                    }, void 0, false, {
                        fileName: "[project]/app/layout.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "viewport",
                        content: "width=device-width, initial-scale=1, viewport-fit=cover"
                    }, void 0, false, {
                        fileName: "[project]/app/layout.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        rel: "preconnect",
                        href: "https://fonts.googleapis.com"
                    }, void 0, false, {
                        fileName: "[project]/app/layout.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        rel: "preconnect",
                        href: "https://fonts.gstatic.com",
                        crossOrigin: "anonymous"
                    }, void 0, false, {
                        fileName: "[project]/app/layout.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        href: "https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Archivo:wght@400;500;600;700;800&display=swap",
                        rel: "stylesheet"
                    }, void 0, false, {
                        fileName: "[project]/app/layout.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/layout.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        onSearchOpen: ()=>setSearchOpen(true)
                    }, void 0, false, {
                        fileName: "[project]/app/layout.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        style: {
                            flex: 1
                        },
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/app/layout.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/app/layout.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    searchOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SearchDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        onClose: ()=>setSearchOpen(false)
                    }, void 0, false, {
                        fileName: "[project]/app/layout.tsx",
                        lineNumber: 39,
                        columnNumber: 24
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MessengerWidget$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/app/layout.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/layout.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/layout.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_s(RootLayout, "IKVxcYztcYLYyGcXF6fM1SG84O0=");
_c = RootLayout;
var _c;
__turbopack_context__.k.register(_c, "RootLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_0dans8u._.js.map