module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/lib/sanity.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$client$2f$dist$2f$index$2e$browser$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@sanity/client/dist/index.browser.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$image$2d$url$2f$lib$2f$_chunks$2d$es$2f$compat$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@sanity/image-url/lib/_chunks-es/compat.js [app-rsc] (ecmascript)");
;
;
const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$client$2f$dist$2f$index$2e$browser$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])({
    projectId: ("TURBOPACK compile-time value", "22wk7h4m"),
    dataset: ("TURBOPACK compile-time value", "production"),
    apiVersion: '2024-01-01',
    useCdn: true,
    token: process.env.SANITY_API_TOKEN
});
const builder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$image$2d$url$2f$lib$2f$_chunks$2d$es$2f$compat$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createImageUrlBuilder"])(client);
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
}),
"[project]/components/PostCard.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/PostCard.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/PostCard.tsx <module evaluation>", "default");
}),
"[project]/components/PostCard.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/PostCard.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/PostCard.tsx", "default");
}),
"[project]/components/PostCard.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PostCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/PostCard.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PostCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/PostCard.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PostCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/components/NewsletterSection.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/NewsletterSection.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/NewsletterSection.tsx <module evaluation>", "default");
}),
"[project]/components/NewsletterSection.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/NewsletterSection.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/NewsletterSection.tsx", "default");
}),
"[project]/components/NewsletterSection.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NewsletterSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/NewsletterSection.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NewsletterSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/NewsletterSection.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NewsletterSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/lib/data.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/app/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage,
    "revalidate",
    ()=>revalidate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sanity$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/sanity.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PostCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/PostCard.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NewsletterSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/NewsletterSection.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
const revalidate = 60;
function cleanWixUrl(url) {
    return url.replace(/~mv2\.(jpg|jpeg|png|webp)~mv2\.\w+/gi, '~mv2.$1');
}
function getSeriesThumb(p) {
    if (p.mainImage) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sanity$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["urlFor"])(p.mainImage).width(168).height(128).url();
    if (p.mainImageUrl) return cleanWixUrl(p.mainImageUrl);
    return null;
}
async function HomePage() {
    const [posts, seriesList] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sanity$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAllPosts"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sanity$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAllSeries"])()
    ]);
    const latestPosts = posts.slice(0, 6);
    const homeSeries = await Promise.all(seriesList.map(async (s)=>{
        const { getPostsBySeries } = await __turbopack_context__.A("[project]/lib/sanity.ts [app-rsc] (ecmascript, async loader)");
        const seriesPosts = await getPostsBySeries(s.slug.current);
        return {
            ...s,
            posts: seriesPosts.slice(0, 7)
        };
    }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    padding: 0
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        position: 'relative',
                        width: '100%',
                        height: 'clamp(200px,28vw,400px)',
                        overflow: 'hidden',
                        borderBottom: '1px solid var(--border)',
                        background: 'var(--secondary)'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        src: "/assets/banner.png",
                        alt: "EmoodziK Music Blog",
                        fill: true,
                        style: {
                            objectFit: 'cover',
                            objectPosition: 'left bottom',
                            transform: 'scale(1.38)',
                            transformOrigin: 'left bottom'
                        },
                        priority: true
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 41,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    padding: '72px 24px'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        margin: '0 auto',
                        maxWidth: 1280
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "desk",
                            style: {
                                display: 'grid',
                                gridTemplateColumns: '1fr 380px',
                                gap: 40,
                                alignItems: 'start'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'baseline',
                                                justifyContent: 'space-between',
                                                borderBottom: '1px solid var(--border)',
                                                paddingBottom: 16
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    style: {
                                                        margin: 0,
                                                        fontFamily: 'var(--font-serif)',
                                                        fontSize: 26,
                                                        color: 'var(--fg)'
                                                    },
                                                    children: "Hàng Mới Ra"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 52,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/music-blog",
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 6,
                                                        fontSize: 14,
                                                        fontWeight: 500,
                                                        color: 'var(--brand)',
                                                        textDecoration: 'none'
                                                    },
                                                    children: [
                                                        "Xem tất cả ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            width: "16",
                                                            height: "16",
                                                            viewBox: "0 0 24 24",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            strokeWidth: "2",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                d: "M5 12h14M12 5l7 7-7 7"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 54,
                                                                columnNumber: 128
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 54,
                                                            columnNumber: 30
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 53,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 51,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid-2",
                                            style: {
                                                paddingTop: 40
                                            },
                                            children: latestPosts.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PostCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                    post: p,
                                                    author: p.author,
                                                    sanity: true
                                                }, p._id, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 58,
                                                    columnNumber: 46
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 57,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 50,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                                    style: {
                                        borderLeft: '1px solid var(--border)',
                                        paddingLeft: 40,
                                        display: 'flex',
                                        flexDirection: 'column'
                                    },
                                    children: homeSeries.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                            style: i > 0 ? {
                                                marginTop: 48,
                                                paddingTop: 48,
                                                borderTop: '1px solid var(--border)'
                                            } : {},
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        borderBottom: '1px solid var(--border)',
                                                        paddingBottom: 12
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        style: {
                                                            margin: 0,
                                                            fontFamily: 'var(--font-serif)',
                                                            fontSize: 26,
                                                            color: 'var(--fg)'
                                                        },
                                                        children: s.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 66,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 65,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        flexDirection: 'column'
                                                    },
                                                    children: s.posts.map((p)=>{
                                                        const src = getSeriesThumb(p);
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                            href: `/posts/${p.slug.current}`,
                                                            style: {
                                                                display: 'flex',
                                                                gap: 14,
                                                                padding: '16px 0',
                                                                borderTop: '1px solid var(--border)',
                                                                textDecoration: 'none',
                                                                color: 'inherit'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        position: 'relative',
                                                                        flex: '0 0 84px',
                                                                        width: 84,
                                                                        height: 64,
                                                                        background: 'var(--muted)',
                                                                        overflow: 'hidden'
                                                                    },
                                                                    children: src && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                                        src: src,
                                                                        alt: p.title,
                                                                        fill: true,
                                                                        style: {
                                                                            objectFit: 'cover'
                                                                        },
                                                                        unoptimized: !p.mainImage
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 74,
                                                                        columnNumber: 37
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 73,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        display: 'flex',
                                                                        flex: 1,
                                                                        flexDirection: 'column'
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                            style: {
                                                                                margin: 0,
                                                                                fontFamily: 'var(--font-serif)',
                                                                                fontSize: 15,
                                                                                fontWeight: 600,
                                                                                lineHeight: 1.3,
                                                                                color: 'var(--fg)',
                                                                                display: '-webkit-box',
                                                                                WebkitBoxOrient: 'vertical',
                                                                                WebkitLineClamp: 2,
                                                                                overflow: 'hidden'
                                                                            },
                                                                            children: p.title
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/page.tsx",
                                                                            lineNumber: 77,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            style: {
                                                                                margin: 'auto 0 0',
                                                                                fontSize: 12,
                                                                                color: 'var(--muted-fg)'
                                                                            },
                                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fmtDate"])(p.publishedAt)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/page.tsx",
                                                                            lineNumber: 78,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 76,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, p._id, true, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 72,
                                                            columnNumber: 25
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 68,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                    href: `/series/${s.slug.current}`,
                                                    style: {
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: 6,
                                                        marginTop: 16,
                                                        fontSize: 13,
                                                        fontWeight: 500,
                                                        color: 'var(--brand)',
                                                        textDecoration: 'none'
                                                    },
                                                    children: [
                                                        "Xem chuyên đề ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            width: "15",
                                                            height: "15",
                                                            viewBox: "0 0 24 24",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            strokeWidth: "2",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                d: "M5 12h14M12 5l7 7-7 7"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 85,
                                                                columnNumber: 133
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 85,
                                                            columnNumber: 35
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 84,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, s._id, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 64,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 62,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mob",
                            style: {
                                flexDirection: 'column'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'baseline',
                                                justifyContent: 'space-between',
                                                borderBottom: '1px solid var(--border)',
                                                paddingBottom: 16
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    style: {
                                                        margin: 0,
                                                        fontFamily: 'var(--font-serif)',
                                                        fontSize: 26,
                                                        color: 'var(--fg)'
                                                    },
                                                    children: "Hàng Mới Ra"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 96,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/music-blog",
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 6,
                                                        fontSize: 14,
                                                        fontWeight: 500,
                                                        color: 'var(--brand)',
                                                        textDecoration: 'none'
                                                    },
                                                    children: [
                                                        "Xem tất cả ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            width: "16",
                                                            height: "16",
                                                            viewBox: "0 0 24 24",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            strokeWidth: "2",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                d: "M5 12h14M12 5l7 7-7 7"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 98,
                                                                columnNumber: 128
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 98,
                                                            columnNumber: 30
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 97,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 95,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 32,
                                                paddingTop: 32
                                            },
                                            children: latestPosts.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PostCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                    post: p,
                                                    author: p.author,
                                                    sanity: true
                                                }, p._id, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 102,
                                                    columnNumber: 46
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 101,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 94,
                                    columnNumber: 13
                                }, this),
                                homeSeries.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        style: {
                                            marginTop: 48,
                                            paddingTop: 48,
                                            borderTop: '1px solid var(--border)'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'baseline',
                                                    justifyContent: 'space-between',
                                                    borderBottom: '1px solid var(--border)',
                                                    paddingBottom: 12
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        style: {
                                                            margin: 0,
                                                            fontFamily: 'var(--font-serif)',
                                                            fontSize: 26,
                                                            color: 'var(--fg)'
                                                        },
                                                        children: s.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 109,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                        href: `/series/${s.slug.current}`,
                                                        style: {
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: 6,
                                                            fontSize: 13,
                                                            fontWeight: 500,
                                                            color: 'var(--brand)',
                                                            textDecoration: 'none',
                                                            whiteSpace: 'nowrap'
                                                        },
                                                        children: [
                                                            "Xem chuyên đề ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                width: "15",
                                                                height: "15",
                                                                viewBox: "0 0 24 24",
                                                                fill: "none",
                                                                stroke: "currentColor",
                                                                strokeWidth: "2",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M5 12h14M12 5l7 7-7 7"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 111,
                                                                    columnNumber: 133
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 111,
                                                                columnNumber: 35
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 110,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 108,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    flexDirection: 'column'
                                                },
                                                children: s.posts.map((p)=>{
                                                    const src = getSeriesThumb(p);
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                        href: `/posts/${p.slug.current}`,
                                                        style: {
                                                            display: 'flex',
                                                            gap: 14,
                                                            padding: '16px 0',
                                                            borderTop: '1px solid var(--border)',
                                                            textDecoration: 'none',
                                                            color: 'inherit'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    position: 'relative',
                                                                    flex: '0 0 84px',
                                                                    width: 84,
                                                                    height: 64,
                                                                    background: 'var(--muted)',
                                                                    overflow: 'hidden'
                                                                },
                                                                children: src && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                                    src: src,
                                                                    alt: p.title,
                                                                    fill: true,
                                                                    style: {
                                                                        objectFit: 'cover'
                                                                    },
                                                                    unoptimized: !p.mainImage
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 120,
                                                                    columnNumber: 35
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 119,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    flex: 1,
                                                                    flexDirection: 'column'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                        style: {
                                                                            margin: 0,
                                                                            fontFamily: 'var(--font-serif)',
                                                                            fontSize: 15,
                                                                            fontWeight: 600,
                                                                            lineHeight: 1.3,
                                                                            color: 'var(--fg)',
                                                                            display: '-webkit-box',
                                                                            WebkitBoxOrient: 'vertical',
                                                                            WebkitLineClamp: 2,
                                                                            overflow: 'hidden'
                                                                        },
                                                                        children: p.title
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 123,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        style: {
                                                                            margin: 'auto 0 0',
                                                                            fontSize: 12,
                                                                            color: 'var(--muted-fg)'
                                                                        },
                                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fmtDate"])(p.publishedAt)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 124,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 122,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, p._id, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 118,
                                                        columnNumber: 23
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 114,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, s._id, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 107,
                                        columnNumber: 15
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 93,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 46,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NewsletterSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 137,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1vkr6nd._.js.map