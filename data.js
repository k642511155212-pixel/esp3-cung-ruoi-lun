"use strict";

window.ESP3_DATA = {
  course: {
    title: "ESP3 — International Business",
    units: 10,
    midtermUnits: [1, 2, 3, 4, 9],
    midterm: {
      duration: 60,
      terminologyCount: 10,
      shortAnswerCount: 3,
      shortAnswerMaxWords: 40,
      essayChoices: 2,
      essayMinWords: 300,
      scores: { terminology: 3, shortAnswers: 3, essay: 4 }
    }
  },
  units: [
    {
      id: "unit-1", num: 1, title: "Introduction to International Business", midterm: true,
      summary: "Nền tảng về giao dịch xuyên biên giới, toàn cầu hóa, MNE, FDI, thể chế và tổ chức chuỗi giá trị quốc tế.",
      theories: [
        {title:"International and domestic business", body:"Kinh doanh quốc tế bao gồm các giao dịch vượt qua biên giới quốc gia nhằm đáp ứng nhu cầu của cá nhân và tổ chức. Khác với kinh doanh nội địa, doanh nghiệp phải xử lý đồng thời khác biệt về tiền tệ, pháp luật, văn hóa và nguồn lực.", points:["Xuất khẩu và nhập khẩu là hình thức cổ điển của kinh doanh quốc tế.","Các chủ thể có thể là cá nhân, doanh nghiệp, nhóm công ty hoặc cơ quan nhà nước.","Một giao dịch quốc tế thường phát sinh thêm rủi ro tỷ giá, luật áp dụng và phối hợp xuyên biên giới."]},
        {title:"Globalization and interdependence", body:"Toàn cầu hóa kinh tế là mức độ phụ thuộc lẫn nhau ngày càng tăng giữa các địa điểm và chủ thể kinh tế. Quốc tế hóa chỉ mô tả việc mở rộng hoạt động qua biên giới; toàn cầu hóa nhấn mạnh sự tích hợp và phụ thuộc hai chiều sâu hơn.", points:["Công nghệ, vận tải và logistics làm giảm chi phí phối hợp quốc tế.","Hội nhập khu vực được tạo ra có chủ đích thông qua các thỏa thuận chính thức.","WTO và các thể chế chung làm cho hành vi thương mại dễ dự đoán hơn."]},
        {title:"MNEs, ownership and FDI", body:"MNE kiểm soát và phối hợp hoạt động tạo giá trị tại ít nhất hai quốc gia. Mức sở hữu quyết định quan hệ affiliate, subsidiary hoặc wholly owned subsidiary. FDI khác đầu tư danh mục ở mục tiêu kiểm soát hoặc gây ảnh hưởng quản trị.", points:["Affiliate thường gắn với phần sở hữu thiểu số đáng kể.","Subsidiary chịu quyền kiểm soát của công ty mẹ; wholly owned nghĩa là sở hữu 100%.","FDI là cam kết dài hạn và khó thanh khoản hơn portfolio investment."]},
        {title:"Value chains, institutions and location", body:"Chuỗi giá trị toàn cầu mô tả các hoạt động từ ý tưởng đến người tiêu dùng; mạng lưới sản xuất toàn cầu nhấn mạnh các chủ thể tham gia. Doanh nghiệp quốc tế phải kết hợp lợi thế riêng của công ty với lợi thế của quốc gia sở tại.", points:["Upstream gắn với đầu vào và khai thác; downstream gắn với chế biến, phân phối và bán hàng.","Formal institutions là luật và quy định thành văn; informal institutions là tập quán và chuẩn mực.","Outsourcing trả lời ai làm; offshoring trả lời hoạt động được thực hiện ở đâu."]}
      ],
      terms: [
        ["International business","Business transactions conducted across national borders.","Kinh doanh quốc tế"],
        ["Export","A good or service produced in one country and sold to another.","Xuất khẩu"],
        ["Import","A good or service purchased from another country.","Nhập khẩu"],
        ["Economic globalization","The growing integration and interdependence of economies and economic actors.","Toàn cầu hóa kinh tế"],
        ["Interdependence","Mutual reliance among individuals, firms, countries or regions.","Sự phụ thuộc lẫn nhau"],
        ["Multinational enterprise (MNE)","A firm that controls and coordinates value-adding activities in at least two countries.","Doanh nghiệp đa quốc gia"],
        ["Affiliate","A company in which another firm owns a significant but normally non-controlling interest.","Công ty liên kết"],
        ["Subsidiary","A company controlled by a parent company through majority ownership.","Công ty con"],
        ["Wholly owned subsidiary","A subsidiary whose entire equity is owned by its parent company.","Công ty con sở hữu toàn bộ"],
        ["Foreign direct investment (FDI)","Long-term foreign investment intended to establish control or significant influence.","Đầu tư trực tiếp nước ngoài"],
        ["Regional integration","Formal cooperation among nearby countries to increase trade and investment.","Hội nhập khu vực"],
        ["Upstream activities","Activities involving raw-material exploration, extraction and early production stages.","Hoạt động thượng nguồn"],
        ["Downstream activities","Activities involving processing, distribution and sale of finished products.","Hoạt động hạ nguồn"],
        ["Innovation","The commercial application of a new or improved product, process or system.","Đổi mới sáng tạo"],
        ["Formal institution","A written and enforceable law, rule or regulation.","Thể chế chính thức"],
        ["Informal institution","An unwritten custom, norm or accepted pattern of behaviour.","Thể chế phi chính thức"],
        ["Global value chain (GVC)","The cross-border sequence of activities that creates and delivers a product or service.","Chuỗi giá trị toàn cầu"],
        ["Firm-specific advantage (FSA)","A company-owned resource or capability that supports competitive success.","Lợi thế riêng của doanh nghiệp"],
        ["Country-specific advantage (CSA)","A resource or condition that makes a particular country attractive for business.","Lợi thế riêng của quốc gia"],
        ["Liability of foreignness","The extra cost or disadvantage a firm faces in an unfamiliar foreign market.","Bất lợi do hoạt động ở thị trường xa lạ"]
      ],
      shortAnswers: [
        {q:"What is international business?",a:"International business refers to transactions conducted across national borders. It includes exporting, importing, foreign investment, international production and cross-border financing."},
        {q:"Why is international business more complicated than domestic business?",a:"It involves different currencies, legal systems, cultures and resource conditions. Firms must also manage greater distance, coordination costs and political or exchange-rate risk."},
        {q:"How does globalization differ from internationalization?",a:"Internationalization extends economic activity across borders, whereas globalization creates deeper integration and mutual dependence among firms, countries, markets and production systems."},
        {q:"How does FDI differ from portfolio investment?",a:"FDI seeks control or significant influence over a foreign business and represents a long-term commitment. Portfolio investment purchases foreign financial assets without seeking managerial control."},
        {q:"Why can a successful global company fail in a foreign market?",a:"Its firm-specific advantages may not fit local culture, regulation or consumer preferences. Failure to adapt can create high liability of foreignness despite a strong global brand."}
      ],
      essays: [
        {prompt:"Standardization or adaptation: which approach should an international company prioritize?", thesis:"International firms should preserve a standardized core for efficiency while adapting customer-facing elements when local culture, regulation or usage conditions materially differ.", outline:["Explain standardization and its scale advantages.","Explain adaptation and local responsiveness.","Use Starbucks, Walmart or IKEA to show the cost of poor fit.","Argue for selective adaptation around a consistent core."]},
        {prompt:"To what extent does globalization benefit small and medium-sized enterprises?", thesis:"Globalization gives SMEs access to markets, technology and networks, but benefits depend on their resources, capabilities and ability to manage stronger competition.", outline:["Define globalization and SMEs.","Benefits: market reach, outsourcing, technology and niche opportunities.","Costs: resource limits, exposure to shocks and MNE competition.","Conclude with conditions for SMEs to benefit."]}
      ]
    },
    {
      id: "unit-2", num: 2, title: "International Trade", midterm: true,
      summary: "Các lý thuyết thương mại, lợi ích chuyên môn hóa, cán cân thương mại, công cụ thúc đẩy và rào cản thương mại.",
      theories: [
        {title:"Trade and the balance of trade",body:"Thương mại quốc tế là việc mua bán hoặc trao đổi hàng hóa và dịch vụ qua biên giới. Khi giá trị xuất khẩu lớn hơn nhập khẩu, quốc gia có thặng dư thương mại; trường hợp ngược lại là thâm hụt.",points:["Thặng dư không tự động đồng nghĩa với nền kinh tế khỏe mạnh.","Thâm hụt của một quốc gia tương ứng với thặng dư ở nơi khác.","Chuỗi giá trị toàn cầu khiến thương mại hàng hóa và dịch vụ gắn chặt hơn."]},
        {title:"Absolute and comparative advantage",body:"Lợi thế tuyệt đối so sánh năng suất trực tiếp; lợi thế so sánh dựa trên chi phí cơ hội. Ngay cả khi một quốc gia sản xuất mọi hàng hóa hiệu quả hơn, hai bên vẫn có thể cùng hưởng lợi nếu chuyên môn hóa theo chi phí cơ hội thấp hơn.",points:["Absolute advantage trả lời ai sản xuất nhiều hơn với cùng nguồn lực.","Comparative advantage trả lời ai hy sinh ít sản phẩm khác hơn.","Trao đổi có lợi cần tỷ lệ trao đổi nằm giữa hai chi phí cơ hội."]},
        {title:"Factor endowments and product life cycle",body:"Heckscher–Ohlin dự đoán quốc gia xuất khẩu sản phẩm sử dụng nhiều yếu tố mà họ có dồi dào. Leontief paradox cho thấy dữ liệu Mỹ từng trái với dự đoán đơn giản này. IPLC giải thích địa điểm sản xuất thay đổi theo vòng đời sản phẩm.",points:["Sản phẩm mới thường bắt đầu gần thị trường và năng lực R&D.","Khi sản phẩm trưởng thành, quy trình chuẩn hóa và sản xuất chuyển đến nơi chi phí thấp.","Chất lượng lao động và công nghệ khiến cách đo vốn–lao động cần thận trọng."]},
        {title:"Promotion and barriers",body:"Chính phủ thúc đẩy thương mại bằng trợ cấp, tài trợ xuất khẩu, bảo lãnh vay và khu thương mại tự do. Họ hạn chế thương mại bằng tariff, quota, embargo, local-content rules hoặc voluntary export restraints.",points:["Rào cản có thể bảo vệ việc làm và ngành non trẻ.","Rào cản cũng làm tăng giá, giảm lựa chọn và khuyến khích kém hiệu quả.","Dumping là bán ở thị trường nước ngoài dưới mức giá hoặc chi phí tham chiếu nhằm giành thị phần."]}
      ],
      terms: [
        ["International trade","The purchase, sale or exchange of goods and services across national borders.","Thương mại quốc tế"],
        ["Trade surplus","A situation in which a country's exports exceed its imports in value.","Thặng dư thương mại"],
        ["Trade deficit","A situation in which a country's imports exceed its exports in value.","Thâm hụt thương mại"],
        ["Mercantilism","The belief that a country should maximize exports and restrict imports to accumulate wealth.","Chủ nghĩa trọng thương"],
        ["Neo-mercantilism","A modern policy of promoting exports and restraining imports to achieve national objectives.","Chủ nghĩa trọng thương mới"],
        ["Absolute advantage","The ability to produce a good more efficiently than another country.","Lợi thế tuyệt đối"],
        ["Comparative advantage","The ability to produce a good at a lower opportunity cost.","Lợi thế so sánh"],
        ["Factor endowment theory","The theory that countries export goods using their abundant production factors intensively.","Lý thuyết nguồn lực sản xuất"],
        ["Heckscher–Ohlin theory","A trade theory linking export patterns to the relative abundance and cost of production factors.","Lý thuyết Heckscher–Ohlin"],
        ["Leontief paradox","The finding that US exports appeared more labour-intensive than its imports despite abundant capital.","Nghịch lý Leontief"],
        ["International product life cycle","A theory explaining how production locations change as a product matures and becomes standardized.","Vòng đời sản phẩm quốc tế"],
        ["Subsidy","Government financial assistance provided to domestic producers.","Trợ cấp"],
        ["Export financing","Loans, guarantees or credit support that help domestic firms sell abroad.","Tài trợ xuất khẩu"],
        ["Foreign trade zone (FTZ)","A designated area where goods receive reduced duties or simplified customs procedures.","Khu thương mại tự do"],
        ["Tariff","A tax imposed on imported or exported goods.","Thuế quan"],
        ["Quota","A quantitative limit on the amount of a product that may be traded.","Hạn ngạch"],
        ["Embargo","A complete official ban on trade with a country or in specified products.","Lệnh cấm vận"],
        ["Dumping","Selling abroad at an unfairly low price, often below cost or the home-market price.","Bán phá giá"],
        ["Local content requirement","A rule requiring a specified share of a product to be produced domestically.","Yêu cầu hàm lượng nội địa"],
        ["Voluntary export restraint (VER)","An export limit imposed by the exporting country, usually under pressure from an importer.","Hạn chế xuất khẩu tự nguyện"]
      ],
      shortAnswers: [
        {q:"Why can countries benefit from comparative advantage?",a:"Countries specialize in goods with lower opportunity costs and trade for the rest. This allows combined output and consumption possibilities to exceed those under self-sufficiency."},
        {q:"How does a tariff differ from a quota?",a:"A tariff raises the price of imports through a tax, while a quota directly limits import quantity. Tariff revenue goes to government; quota rents may go to licence holders."},
        {q:"Why do governments provide subsidies to exporters?",a:"Subsidies lower domestic producers’ costs, improve their international competitiveness and support exports, employment or strategic industries. However, they may distort competition and burden taxpayers."},
        {q:"What does the international product life cycle explain?",a:"It explains how production may begin in the innovating country, spread to foreign subsidiaries and eventually move to lower-cost locations as the product matures and becomes standardized."},
        {q:"Why might trade barriers reduce national welfare?",a:"They raise prices, reduce consumer choice, protect inefficient firms and invite retaliation. Resources may remain in activities where the country lacks comparative advantage."}
      ],
      essays: [
        {prompt:"Do you agree that free trade makes rich countries richer and poor countries poorer? Use trade theories to support your argument.",thesis:"Free trade can benefit both developed and developing countries through comparative advantage, but unequal capabilities and adjustment costs mean that complementary domestic policies are necessary.",outline:["Introduce the claim and comparative advantage.","Explain gains from specialization, scale and market access.","Discuss unequal bargaining power, infant industries and adjustment costs.","Conclude that outcomes depend on institutions and supporting policies."]},
        {prompt:"Should developing countries protect infant industries?",thesis:"Temporary, targeted protection may help viable infant industries learn and scale, but it must be conditional and time-limited to avoid permanent inefficiency.",outline:["Define the infant-industry argument.","Explain learning, scale and strategic capability benefits.","Analyze higher prices, lobbying and retaliation risks.","Set conditions: clear targets, sunset clauses and performance review."]}
      ]
    },
    {
      id:"unit-3", num:3, title:"International Trade Policy", midterm:true,
      summary:"Cán cân thanh toán, tự do hóa, bảo hộ, chính sách cạnh tranh và các nguyên tắc của hệ thống thương mại đa phương.",
      theories:[
        {title:"Balance of payments",body:"BOP là bản ghi có hệ thống về giao dịch kinh tế giữa cư dân một quốc gia và phần còn lại của thế giới trong một kỳ. Current account ghi hàng hóa, dịch vụ, thu nhập và chuyển giao; financial/capital flows ghi giao dịch tài sản và vốn.",points:["Balance of trade chỉ là xuất khẩu trừ nhập khẩu hàng hóa hoặc hàng hóa–dịch vụ tùy cách dùng.","Một tài khoản có thể thặng dư hoặc thâm hụt nhưng toàn bộ BOP được cân bằng bằng nguyên tắc ghi kép và sai số.","Không nên dùng riêng cán cân thương mại để kết luận nền kinh tế thành công hay thất bại."]},
        {title:"Free trade and protectionism",body:"Free trade hướng đến dòng lưu chuyển ít bị cản trở; protectionism bảo vệ nhà sản xuất trong nước bằng thuế quan, trợ cấp và biện pháp phi thuế. Tranh luận chính là lợi ích dài hạn của cạnh tranh so với chi phí điều chỉnh ngắn hạn.",points:["Bảo hộ có thể trì hoãn tái cơ cấu ngành kém hiệu quả.","Tự do thương mại không có nghĩa là hoàn toàn không có quy định.","Chính sách cần cân bằng phúc lợi người tiêu dùng, việc làm và mục tiêu chiến lược."]},
        {title:"Liberalization and policy rules",body:"Trade liberalization là quá trình giảm dần hoặc loại bỏ rào cản thương mại. Trade policy là toàn bộ luật, quy định, thỏa thuận và lập trường đàm phán dùng để tạo tiếp cận thị trường có thể dự đoán.",points:["MFN yêu cầu đối xử ưu đãi tương đương giữa các đối tác WTO, trừ ngoại lệ hợp lệ.","National treatment yêu cầu hàng nhập khẩu sau thông quan không bị đối xử bất lợi so với hàng nội địa tương tự.","Transparency giúp doanh nghiệp dự đoán điều kiện tiếp cận thị trường."]},
        {title:"Bilateral and multilateral cooperation",body:"Bilateral agreement điều chỉnh thương mại giữa hai quốc gia; multilateral agreement tạo bộ quyền và nghĩa vụ chung cho nhiều thành viên. Hệ thống đa phương giảm phân biệt đối xử nhưng đàm phán phức tạp hơn.",points:["WTO quản lý các thỏa thuận và giải quyết tranh chấp.","Contingent protection gồm anti-dumping, countervailing duties và safeguards.","Competition policy bảo vệ cạnh tranh và người tiêu dùng; trade remedies thường bảo vệ nhà sản xuất."]}
      ],
      terms:[
        ["Balance of payments (BOP)","A systematic record of a country's economic transactions with the rest of the world.","Cán cân thanh toán"],
        ["Current account","The BOP account recording trade in goods and services, income and current transfers.","Tài khoản vãng lai"],
        ["Financial account","The BOP account recording cross-border transactions in financial assets and liabilities.","Tài khoản tài chính"],
        ["Balance of trade","The difference between the value of exports and imports.","Cán cân thương mại"],
        ["Commercial policy","Government measures and practices that influence trade in goods and services.","Chính sách thương mại"],
        ["Competition policy","Laws and policies designed to preserve competition and prevent anti-competitive behaviour.","Chính sách cạnh tranh"],
        ["Anti-dumping measure","A trade remedy imposed against imports judged to be unfairly dumped.","Biện pháp chống bán phá giá"],
        ["Competitive advantage","A cost or differentiation strength that enables a firm or industry to outperform rivals.","Lợi thế cạnh tranh"],
        ["Contingent protection","WTO-permitted protection triggered by dumping, subsidies or damaging import surges.","Bảo hộ có điều kiện"],
        ["Protectionism","Policies that shield domestic producers from foreign competition.","Chủ nghĩa bảo hộ"],
        ["Free trade","Cross-border exchange with minimal discriminatory government barriers.","Thương mại tự do"],
        ["Trade liberalization","The gradual or complete removal of barriers to trade.","Tự do hóa thương mại"],
        ["Trade policy","A government's framework of trade laws, agreements and negotiating positions.","Chính sách thương mại quốc tế"],
        ["Bilateral trade agreement","An agreement governing trade conditions between two countries.","Hiệp định thương mại song phương"],
        ["Multilateral trade agreement","A common trade agreement among many countries based on shared rights and obligations.","Hiệp định thương mại đa phương"],
        ["Most-favoured-nation treatment","The principle of extending a trade advantage granted to one member to all relevant members.","Đối xử tối huệ quốc"],
        ["National treatment","The principle of treating imported products no less favourably than similar domestic products after entry.","Đối xử quốc gia"],
        ["Safeguard","Temporary protection against an unexpected import surge that seriously injures domestic industry.","Biện pháp tự vệ"]
      ],
      shortAnswers:[
        {q:"What is the balance of payments?",a:"The balance of payments is a systematic record of a country's trade, income, transfers and financial transactions with the rest of the world during a specified period."},
        {q:"Why is a trade deficit not automatically evidence of failure?",a:"A deficit may reflect strong investment, rising income or capital inflows. Its meaning depends on financing, productivity, debt sustainability and the structure of the economy."},
        {q:"How does protectionism affect consumers?",a:"Protectionism may preserve domestic production, but consumers usually face higher prices, fewer choices and weaker competitive pressure for quality and innovation."},
        {q:"How do bilateral and multilateral trade agreements differ?",a:"A bilateral agreement governs trade between two countries. A multilateral agreement creates common rights and obligations for many members under non-discriminatory, predictable and transparent rules."},
        {q:"Why are safeguards called contingent protection?",a:"They are not permanent barriers. They may be activated only when specified conditions, such as a damaging import surge, dumping or subsidized imports, are demonstrated."}
      ],
      essays:[
        {prompt:"Liberalization of international trade is an irreversible trend. Do you agree or disagree?",thesis:"Trade liberalization is a powerful long-run trend driven by technology and interdependence, but it is not irreversible because political, security and distributional pressures can restore barriers.",outline:["Define liberalization and state position.","Explain technology, GVCs and international agreements.","Discuss protectionist reversals, crises and national security.","Conclude that direction is strong but progress is uneven and reversible."]},
        {prompt:"Does international trade liberalization benefit developed countries more than developing countries?",thesis:"Developed countries often capture larger immediate gains through capital and technology, but developing countries can gain substantially when liberalization is gradual and supported by education, infrastructure and industrial capability.",outline:["Compare starting capabilities.","Benefits for developed countries: technology, finance and brands.","Opportunities and adjustment risks for developing countries.","Explain the domestic policies needed for more balanced gains."]}
      ]
    },
    {
      id:"unit-4", num:4, title:"Foreign Direct Investment", midterm:true,
      summary:"Động cơ FDI, incentives, phân phối và licensing, joint venture, acquisition, merger và các rủi ro kiểm soát.",
      theories:[
        {title:"FDI and portfolio investment",body:"Portfolio investment mua chứng khoán nước ngoài và có thể thanh khoản trên thị trường; FDI thiết lập hoặc mua quyền sở hữu trong hoạt động kinh doanh nước ngoài để kiểm soát hoặc cùng kiểm soát sản xuất, R&D và bán hàng.",points:["FDI khóa vốn lâu hơn và cần phân tích chiến lược sâu hơn.","Mục tiêu thường là thị trường, nguyên liệu, hiệu quả hoặc know-how.","Dự án khả thi phải có lợi nhuận kỳ vọng phù hợp và nguồn tài trợ đáng tin cậy."]},
        {title:"Investment environment",body:"Nhà đầu tư đánh giá dòng tiền, lãi suất, vốn lưu động, luật lao động, luật cạnh tranh, khả năng can thiệp của chính phủ và incentives. Ưu đãi thường cao hơn tại vùng cần thu hút việc làm.",points:["Incentives gồm cash grants, tax credits, accelerated depreciation và soft loans.","Ưu đãi không thể bù đắp một dự án thiếu thị trường hoặc năng lực vận hành.","Phân tích phải tính cả rủi ro chính trị, pháp lý và khả năng chuyển lợi nhuận."]},
        {title:"Entry and ownership choices",body:"Doanh nghiệp có thể bắt đầu bằng distributor, chuyển sang sales subsidiary, licensing, joint venture hoặc wholly owned operation. Mỗi phương án đánh đổi giữa tốc độ, vốn, kiến thức địa phương và quyền kiểm soát.",points:["Licensing giảm vốn nhưng tăng rủi ro chất lượng và mất know-how.","Joint venture chia sẻ vốn và kiến thức nhưng dễ xung đột quyền kiểm soát.","Wholly owned subsidiary cho kiểm soát cao nhất nhưng chịu toàn bộ rủi ro."]},
        {title:"Mergers and acquisitions",body:"Acquisition là một công ty giành quyền sở hữu công ty khác; merger tạo một thực thể chung. M&A có thể tăng thị phần, giảm cạnh tranh và tạo economies of scale nhưng thường thất bại khi synergy bị đánh giá quá cao.",points:["Horizontal merger kết hợp đối thủ cùng ngành; vertical merger kết hợp các công đoạn liên tiếp.","Raid mua cổ phiếu trên thị trường; takeover bid chào mua công khai.","Leveraged buyout dùng nợ để mua; management buyout do chính đội ngũ quản lý thực hiện."]}
      ],
      terms:[
        ["Foreign portfolio investment","The purchase of foreign shares or long-term debt without seeking managerial control.","Đầu tư danh mục nước ngoài"],
        ["Foreign direct investment","Investment in foreign operations intended to control or share control of business activities.","Đầu tư trực tiếp nước ngoài"],
        ["Strategic approach","An FDI approach guided by access to markets, resources, efficiency or know-how.","Cách tiếp cận chiến lược"],
        ["Cash flow","Cash remaining or generated after relevant cash expenses and taxes.","Dòng tiền"],
        ["Investment incentive","A government benefit offered to attract investment, such as a grant or tax credit.","Ưu đãi đầu tư"],
        ["Exclusive distributor","An independent agent holding the sole contractual right to sell a manufacturer's products.","Nhà phân phối độc quyền"],
        ["Multiple distributor","A distributor that represents products from more than one manufacturer.","Nhà phân phối đa hãng"],
        ["Royalty payment","A payment made for permission to use licensed property, technology or a brand.","Phí bản quyền"],
        ["Licensing","Authorizing a foreign firm to produce or sell intellectual property in return for fees.","Cấp phép"],
        ["Joint venture","A business entity jointly owned by two or more parent companies.","Liên doanh"],
        ["Acquisition","The purchase through which one company gains control of another.","Mua lại doanh nghiệp"],
        ["Raid","The rapid purchase of as many target-company shares as possible on the market.","Thu gom cổ phiếu"],
        ["Takeover bid","A public offer to buy shareholders' shares at a stated price within a limited period.","Chào mua thâu tóm"],
        ["Buyout","A share purchase that gives the buyer a controlling interest in a company.","Mua quyền kiểm soát"],
        ["Merger","The combination of two firms into a single business organization.","Sáp nhập"],
        ["Horizontal merger","A merger between companies producing similar products at the same industry stage.","Sáp nhập ngang"],
        ["Vertical merger","A merger between firms operating at connected stages of production or distribution.","Sáp nhập dọc"],
        ["Diversification","Expansion into a substantially different product, market or industry.","Đa dạng hóa"],
        ["Leveraged buyout (LBO)","An acquisition financed largely with borrowed money.","Mua lại bằng đòn bẩy"],
        ["Management buyout (MBO)","A buyout in which the target company's managers acquire control.","Mua lại bởi ban quản lý"]
      ],
      shortAnswers:[
        {q:"How does foreign portfolio investment differ from FDI?",a:"Portfolio investors buy foreign financial assets without seeking control and can usually sell them readily. FDI involves a long-term commitment to control or share control of foreign operations."},
        {q:"Why do governments offer investment incentives?",a:"They use grants, tax benefits, training support or low-interest loans to attract capital, create jobs, develop regions, transfer technology and strengthen local economic activity."},
        {q:"Why might a company choose a joint venture?",a:"A joint venture shares capital, risk and know-how while providing local market access. However, partners may later disagree over control, strategy, technology or profit distribution."},
        {q:"What is a major drawback of licensing?",a:"The licensor gives up operational control. Poor product quality or marketing by the licensee can damage the brand, and valuable know-how may create a future competitor."},
        {q:"Why do mergers and acquisitions sometimes destroy value?",a:"Buyers may overpay, exaggerate synergies, lose key employees or struggle to integrate different systems and cultures. Greater size can also create complexity and inefficiency."}
      ],
      essays:[
        {prompt:"What are the advantages and disadvantages of FDI in Vietnam?",thesis:"FDI can strengthen Vietnam through capital, employment, exports and technology, but policy must limit environmental harm, weak linkages, transfer pricing and excessive dependence on foreign firms.",outline:["Define FDI and Vietnam's development context.","Benefits: capital, jobs, skills, technology and export networks.","Costs: crowding out, profit repatriation, environment and dependency.","Recommend selective incentives tied to measurable spillovers."]},
        {prompt:"Is a joint venture better than a wholly owned subsidiary when entering a foreign market?",thesis:"A joint venture is preferable when local knowledge, regulation and shared risk are critical; full ownership is stronger when control, intellectual property and global consistency dominate.",outline:["Compare ownership and control.","Joint-venture advantages and conflict risks.","Wholly owned advantages and resource risks.","Use market conditions to make a contingent conclusion."]}
      ]
    },
    {
      id:"unit-5", num:5, title:"Foreign Exchange", midterm:false,
      summary:"Thị trường ngoại hối, cách yết giá, spot và forward, hedging, arbitrage, speculation, swaps, options và futures.",
      theories:[
        {title:"Market and quotations",body:"Thị trường ngoại hối cho phép mua bán tiền tệ và xác định tỷ giá. Ngân hàng báo giá bid để mua và ask để bán; chênh lệch bid–ask là nguồn thu và bù đắp chi phí, rủi ro thanh khoản.",points:["Quoted currency nằm ở tử số; base currency nằm ở mẫu số.","Doanh nghiệp dùng FX market để chuyển doanh thu, thanh toán nhà cung cấp và đầu tư.","Tỷ giá chịu tác động của cung cầu, lạm phát, lãi suất, tăng trưởng và chính sách."]},
        {title:"Spot and forward transactions",body:"Spot rate áp dụng cho giao nhận tiền tệ gần như ngay lập tức, thường trong hai ngày làm việc. Forward rate được thỏa thuận hôm nay cho một giao dịch vào ngày tương lai, giúp khóa chi phí hoặc doanh thu.",points:["Forward contract tạo nghĩa vụ cho cả hai bên.","Forward premium xảy ra khi forward rate cao hơn spot rate theo cách yết giá đang dùng.","Hedging giảm bất định nhưng có thể làm mất lợi ích từ biến động thuận lợi."]},
        {title:"Hedging, arbitrage and speculation",body:"Hedging bảo vệ một khoản phải thu hoặc phải trả có sẵn. Arbitrage khai thác chênh lệch giá gần như đồng thời giữa các thị trường. Speculation chủ động nhận rủi ro dựa trên dự đoán tỷ giá để kiếm lời.",points:["Hedger bắt đầu từ một exposure kinh doanh.","Arbitrage profit phải lớn hơn transaction costs.","Speculation có rủi ro cao vì tỷ giá tương lai không chắc chắn."]},
        {title:"Derivatives and exchange-rate systems",body:"Swaps, options và futures là công cụ phái sinh. Option trao quyền nhưng không bắt buộc thực hiện; futures chuẩn hóa và tạo nghĩa vụ. Trong fixed-rate system, ngân hàng trung ương bảo vệ biên độ; floating rate chủ yếu do cung cầu xác định.",points:["Currency swap kết hợp mua và bán ngoại tệ ở hai ngày khác nhau.","Option buyer trả premium để có quyền lựa chọn.","Central banks vẫn có thể can thiệp trong hệ thống thả nổi có quản lý."]}
      ],
      terms:[
        ["Foreign exchange","Money or currency of a foreign country.","Ngoại hối"],
        ["Foreign exchange market","The market where currencies are traded and exchange rates are determined.","Thị trường ngoại hối"],
        ["Exchange rate","The rate at which one currency is exchanged for another.","Tỷ giá hối đoái"],
        ["Bid rate","The rate at which a dealer buys the base currency.","Tỷ giá mua"],
        ["Ask rate","The rate at which a dealer sells the base currency.","Tỷ giá bán"],
        ["Bid–ask spread","The difference between a dealer's ask and bid rates.","Chênh lệch giá mua–bán"],
        ["Spot rate","An exchange rate for currency delivery within about two business days.","Tỷ giá giao ngay"],
        ["Forward rate","An exchange rate agreed today for a currency exchange on a future date.","Tỷ giá kỳ hạn"],
        ["Hedging","Reducing exposure to adverse price or exchange-rate movements.","Phòng ngừa rủi ro"],
        ["Arbitrage","Simultaneously buying and selling to profit from price differences across markets.","Kinh doanh chênh lệch giá"],
        ["Speculation","Taking currency risk in expectation of profiting from a future price change.","Đầu cơ"],
        ["Forward contract","A binding customized agreement to exchange currency later at a fixed rate.","Hợp đồng kỳ hạn"],
        ["Currency option","The right, but not the obligation, to exchange currency at a specified rate.","Quyền chọn tiền tệ"],
        ["Currency swap","A simultaneous purchase and sale of currencies for two different value dates.","Hoán đổi tiền tệ"],
        ["Currency futures","A standardized exchange-traded contract for future currency exchange.","Hợp đồng tương lai tiền tệ"],
        ["Fixed exchange rate","A system in which authorities maintain a currency near an agreed value.","Tỷ giá cố định"],
        ["Floating exchange rate","A system in which currency value is mainly determined by market supply and demand.","Tỷ giá thả nổi"],
        ["Central bank intervention","Official purchases or sales of currency intended to influence its value.","Can thiệp của ngân hàng trung ương"]
      ],
      shortAnswers:[
        {q:"What are the four main uses of the foreign exchange market?",a:"It enables currency conversion, hedging against exchange-rate risk, arbitrage across markets and speculation on future currency movements."},
        {q:"How does the spot rate differ from the forward rate?",a:"A spot rate applies to near-immediate delivery, usually within two business days. A forward rate is agreed now for an exchange on a specified future date."},
        {q:"Why do firms hedge foreign-currency receivables?",a:"Hedging locks or limits the home-currency value of future receipts, protecting profit and cash-flow planning if the foreign currency depreciates before payment arrives."},
        {q:"How does arbitrage differ from speculation?",a:"Arbitrage exploits existing price differences through nearly simultaneous trades with limited market risk. Speculation accepts uncertainty by betting on a future currency movement."},
        {q:"Why might a company prefer an option to a forward contract?",a:"An option protects against an unfavourable movement while preserving the benefit of a favourable one. A forward locks the rate and creates an obligation for both parties."}
      ],
      essays:[
        {prompt:"What are the main ways of making money in the foreign exchange market?",thesis:"Profits may arise from dealing spreads, arbitrage and informed speculation, but each method depends on different information, speed, capital and risk exposure.",outline:["Introduce FX participants and market function.","Explain bid–ask dealing income.","Explain arbitrage and transaction-cost limits.","Explain speculation, leverage and risk controls."]},
        {prompt:"Should an international trading company always hedge exchange-rate risk?",thesis:"A company should hedge material exposures according to its risk policy, but not automatically hedge every amount because costs, natural offsets and uncertainty about the transaction matter.",outline:["Define transaction exposure and hedging.","Benefits: certainty, margins and planning.","Costs: premiums, lost upside and over-hedging risk.","Recommend exposure measurement and a consistent policy."]}
      ]
    },
    {
      id:"unit-6", num:6, title:"Payment in International Trade", midterm:false,
      summary:"Open account, advance payment, documentary collection, letters of credit, bills of exchange và vai trò của các ngân hàng.",
      theories:[
        {title:"Payment-risk spectrum",body:"Các phương thức thanh toán phân bổ rủi ro khác nhau giữa exporter và importer. Advance payment an toàn nhất cho exporter nhưng rủi ro nhất cho importer; open account làm ngược lại.",points:["Lựa chọn phụ thuộc vào độ tin cậy, sức mạnh đàm phán, quốc gia và chi phí ngân hàng.","Không có phương thức tốt nhất cho cả hai bên.","Hợp đồng bán hàng và phương thức thanh toán phải nhất quán về chứng từ, thời hạn và đồng tiền."]},
        {title:"Documentary collections",body:"Exporter ký phát bill of exchange và nhờ ngân hàng thu hộ. Trong documentary collection, chứng từ thương mại hoặc chứng từ sở hữu đi kèm hối phiếu; ngân hàng chỉ xử lý chứng từ chứ không cam kết thanh toán.",points:["D/P giao chứng từ khi importer thanh toán.","D/A giao chứng từ khi importer chấp nhận time draft và hứa trả sau.","D/A rủi ro hơn cho exporter vì quyền kiểm soát hàng đã được giao trước khi nhận tiền."]},
        {title:"Documentary letters of credit",body:"L/C là cam kết độc lập của issuing bank trả tiền khi exporter xuất trình bộ chứng từ phù hợp. Ngân hàng giao dịch với chứng từ, không kiểm tra hàng hóa thực tế.",points:["Advising bank xác thực và thông báo L/C.","Confirming bank thêm cam kết thanh toán của chính mình.","Discrepancy có thể khiến ngân hàng từ chối hoặc yêu cầu importer chấp nhận sai biệt."]},
        {title:"Drafts and L/C variations",body:"Sight draft được trả khi xuất trình; usance draft trả vào ngày tương lai. Các biến thể L/C điều chỉnh khả năng hủy, chuyển nhượng, ứng trước, quay vòng hoặc bảo đảm nghĩa vụ dự phòng.",points:["Irrevocable L/C không thể sửa hoặc hủy nếu thiếu sự đồng ý cần thiết.","Transferable và back-to-back L/C hỗ trợ giao dịch qua trung gian.","Standby L/C chỉ được yêu cầu thanh toán khi nghĩa vụ cơ sở không được thực hiện."]}
      ],
      terms:[
        ["International payment","The cross-border transfer of an accepted liquid asset in exchange for goods, services or assets.","Thanh toán quốc tế"],
        ["Open account","A method in which goods are shipped before payment becomes due.","Phương thức ghi sổ"],
        ["Advance payment","Payment made in full or in part before the seller dispatches the goods.","Thanh toán trước"],
        ["Documentary letter of credit","A bank undertaking to pay against a complying presentation of required documents.","Tín dụng chứng từ"],
        ["Revocable letter of credit","A credit that may be cancelled or amended without prior beneficiary consent.","L/C có thể hủy ngang"],
        ["Irrevocable letter of credit","A credit that cannot be cancelled or amended without required parties' agreement.","L/C không thể hủy ngang"],
        ["Confirmed letter of credit","A credit carrying a second bank's independent commitment to pay.","L/C có xác nhận"],
        ["Advised letter of credit","A credit authenticated and communicated to the beneficiary by an advising bank.","L/C được thông báo"],
        ["Transferable letter of credit","A credit that permits the first beneficiary to transfer available credit to another beneficiary.","L/C chuyển nhượng"],
        ["Revolving letter of credit","A credit whose amount becomes available again under specified conditions.","L/C tuần hoàn"],
        ["Back-to-back letter of credit","A second credit issued using the first credit as supporting security.","L/C giáp lưng"],
        ["Standby letter of credit","A bank undertaking payable when the applicant fails to perform an underlying obligation.","L/C dự phòng"],
        ["Red clause letter of credit","A credit allowing an advance to the beneficiary before shipment.","L/C điều khoản đỏ"],
        ["Bill of exchange","A written order requiring a named party to pay a specified sum on demand or later.","Hối phiếu"],
        ["Sight draft","A draft payable when it is presented to the drawee.","Hối phiếu trả ngay"],
        ["Usance draft","A draft payable after a specified period or on a future date.","Hối phiếu kỳ hạn"],
        ["Banker's acceptance","A time draft accepted by a bank, making the bank primarily liable for payment.","Chấp nhận ngân hàng"],
        ["Bills for collection","Drafts handled through banks for collection without a bank payment guarantee.","Nhờ thu hối phiếu"],
        ["Clean collection","Collection of a financial document without attached commercial documents.","Nhờ thu phiếu trơn"],
        ["Documentary collection","Collection in which commercial or title documents accompany the draft.","Nhờ thu kèm chứng từ"],
        ["Documents against payment (D/P)","Release of shipping documents only after the importer pays the draft.","Giao chứng từ trả tiền"],
        ["Documents against acceptance (D/A)","Release of documents after the importer accepts a time draft.","Giao chứng từ chấp nhận"],
        ["Issuing bank","The importer's bank that issues a documentary credit.","Ngân hàng phát hành"],
        ["Advising bank","The bank that authenticates and advises a credit to the beneficiary.","Ngân hàng thông báo"],
        ["Confirming bank","A bank that adds its own payment undertaking to a credit.","Ngân hàng xác nhận"],
        ["Bill of lading","A transport document serving as receipt, evidence of carriage and sometimes document of title.","Vận đơn đường biển"]
      ],
      shortAnswers:[
        {q:"Why is open account risky for an exporter?",a:"The exporter ships goods and releases documents before receiving payment. If the importer delays, defaults or disputes the sale, the exporter has limited control over the goods."},
        {q:"What is the role of banks in documentary collection?",a:"Banks forward drafts and documents, present them to the importer and collect payment or acceptance. They follow instructions but normally do not guarantee payment."},
        {q:"Why is a confirmed letter of credit safer for an exporter?",a:"A confirming bank adds its own independent payment commitment, reducing the exporter's exposure to the issuing bank and the importer's country risk."},
        {q:"How do D/P and D/A differ?",a:"Under D/P, documents are released only after payment. Under D/A, documents are released after the importer accepts a time draft, so the exporter receives payment later."},
        {q:"Why can a bank refuse payment under an L/C?",a:"A bank may refuse when the presentation does not strictly comply with the credit, such as inconsistent descriptions, late shipment, missing documents or incorrect dates."}
      ],
      essays:[
        {prompt:"What are the advantages and disadvantages of open-account payment in international trade?",thesis:"Open account improves the buyer's cash flow and the exporter's competitiveness, but it exposes the exporter to non-payment and country risk unless trust and credit controls are strong.",outline:["Explain the payment sequence.","Advantages for importer and commercial relationship.","Exporter risks: default, delay, country and currency exposure.","State when open account is appropriate and how to mitigate risk."]},
        {prompt:"Which payment method should a new exporter choose for an unfamiliar buyer?",thesis:"A new exporter should normally prefer a confirmed irrevocable L/C or advance payment because payment security matters more than low transaction cost when buyer information is limited.",outline:["Identify buyer and country uncertainty.","Compare advance payment, L/C, collection and open account.","Explain document-compliance cost under L/C.","Recommend a method and possible transition after trust develops."]}
      ]
    },
    {
      id:"unit-7", num:7, title:"Marketing", midterm:false,
      summary:"Marketing concept, research, segmentation, customer value, marketing mix, channels, branding và digital marketing.",
      theories:[
        {title:"Selling and marketing concepts",body:"Selling tập trung thuyết phục khách mua thứ doanh nghiệp đã làm ra; marketing bắt đầu từ nhu cầu và thiết kế giá trị phù hợp. Marketing vì vậy là trách nhiệm xuyên suốt tổ chức, không chỉ của bộ phận quảng cáo.",points:["Marketers có thể nhận diện hoặc tạo ra nhu cầu mới.","Thị trường B2B gồm nguyên liệu, linh kiện, thiết bị và dịch vụ cho tổ chức.","Một sản phẩm tốt vẫn cần đúng phân khúc, giá, kênh và truyền thông."]},
        {title:"Needs, value and satisfaction",body:"Needs là yêu cầu cơ bản; wants là hình thức cụ thể của nhu cầu; demands là wants có khả năng thanh toán. Customer value so sánh lợi ích cảm nhận với chi phí; satisfaction so sánh performance với expectations.",points:["Performance thấp hơn kỳ vọng tạo dissatisfaction.","Value gồm cả lợi ích hữu hình, vô hình và tổng chi phí sở hữu.","Không nên tạo kỳ vọng quảng cáo vượt quá trải nghiệm thực tế."]},
        {title:"Research, segmentation and target market",body:"Market research thu thập và phân tích dữ liệu cho một quyết định thị trường. Segmentation chia thị trường thành các nhóm có nhu cầu hoặc hành vi khác nhau; doanh nghiệp chọn target market mà mình có thể phục vụ có lợi nhuận.",points:["Research giảm bất định nhưng không loại bỏ hoàn toàn rủi ro.","Segment cần đo lường được, tiếp cận được và đủ hấp dẫn.","Product concept nên được kiểm tra với khách hàng mục tiêu trước khi tung ra."]},
        {title:"Marketing mix and channels",body:"Marketing mix phối hợp Product, Price, Place và Promotion. Communication channels truyền thông điệp; distribution channels đưa sản phẩm đến người dùng; service channels hỗ trợ giao dịch như kho, vận tải, ngân hàng và bảo hiểm.",points:["Thay đổi một P thường ảnh hưởng các P còn lại.","Brand nhận diện sản phẩm; trademark là dấu hiệu được pháp luật bảo hộ.","Digital marketing bổ sung dữ liệu và khả năng cá nhân hóa nhưng không tự động thay thế mọi kênh truyền thống."]}
      ],
      terms:[
        ["Marketing","The process of creating, offering and exchanging value to satisfy needs and wants.","Marketing / tiếp thị"],
        ["Marketplace","A physical environment in which buyers and sellers interact.","Thị trường vật lý"],
        ["Marketspace","A digital environment in which buyers and sellers interact.","Không gian thị trường số"],
        ["Market research","The collection and analysis of data relevant to a specific marketing decision.","Nghiên cứu thị trường"],
        ["Need","A basic human requirement.","Nhu cầu cơ bản"],
        ["Want","A need directed toward a specific object or solution.","Mong muốn"],
        ["Demand","A want for a specific product supported by ability to pay.","Nhu cầu có khả năng thanh toán"],
        ["Market segmentation","Dividing a market into distinct groups with different needs or behaviour.","Phân khúc thị trường"],
        ["Target market","The customer segment a company chooses to serve.","Thị trường mục tiêu"],
        ["Brand","A name, sign, symbol or design that identifies an offering.","Thương hiệu"],
        ["Trademark","A legally protected brand name, symbol or sign.","Nhãn hiệu được bảo hộ"],
        ["Customer value","The customer's assessment of total perceived benefits relative to total costs.","Giá trị khách hàng"],
        ["Customer satisfaction","A judgement formed by comparing perceived performance with expectations.","Sự hài lòng của khách hàng"],
        ["Marketing mix","The coordinated product, price, place and promotion decisions used to influence a market.","Marketing mix"],
        ["Product concept","A proposed product idea described in terms meaningful to target customers.","Ý niệm sản phẩm"],
        ["Distribution channel","Organizations or individuals that help move an offering from producer to user.","Kênh phân phối"],
        ["Communication channel","A medium used to deliver and receive messages from target buyers.","Kênh truyền thông"],
        ["Service channel","An organization that facilitates transactions, such as a bank, warehouse or insurer.","Kênh dịch vụ"],
        ["Market share","A firm's sales expressed as a percentage of total market sales.","Thị phần"],
        ["Digital marketing","Marketing that uses digital technologies and online channels to create and communicate value.","Tiếp thị số"]
      ],
      shortAnswers:[
        {q:"How does marketing differ from selling?",a:"Selling persuades customers to buy what a firm has produced. Marketing begins by identifying customer needs and then designs, prices, distributes and promotes an appropriate offering."},
        {q:"How do needs, wants and demands differ?",a:"Needs are basic requirements. Wants are specific ways of satisfying needs. Demands are wants for particular products supported by willingness and ability to pay."},
        {q:"Why do companies segment markets?",a:"Segmentation identifies groups with distinct needs or behaviour, allowing firms to choose attractive targets and design more relevant products, prices, channels and communication."},
        {q:"What are the four elements of the marketing mix?",a:"The four elements are product, price, place and promotion. They must be coordinated because a decision in one element affects the effectiveness of the others."},
        {q:"How does customer satisfaction arise?",a:"Customers compare perceived product performance with expectations. Performance below expectations causes dissatisfaction; matching expectations creates satisfaction; exceeding expectations may create delight."}
      ],
      essays:[
        {prompt:"Digital marketing will replace traditional marketing in the near future. Do you agree or disagree?",thesis:"Digital marketing will dominate many customer journeys, but it will complement rather than completely replace traditional channels because audiences, products and trust-building contexts differ.",outline:["Define digital and traditional marketing.","Digital strengths: targeting, measurement, interaction and cost.","Traditional strengths: reach, credibility and physical context.","Argue for an integrated channel strategy."]},
        {prompt:"Is moving towards digital marketing a must for every company?",thesis:"Every company needs an appropriate digital presence, but the required level of investment should follow customer behaviour, product type, capabilities and measurable returns.",outline:["Explain why customers increasingly use digital channels.","Benefits for data, service and market reach.","Limits for some segments and high-consideration purchases.","Recommend selective, customer-led digital transformation."]}
      ]
    },
    {
      id:"unit-8", num:8, title:"Logistics and Transportation", midterm:false,
      summary:"Dòng hàng hóa, integrated logistics, order management, transport networks, documentation và green logistics.",
      theories:[
        {title:"Logistics and supply chains",body:"Logistics lập kế hoạch và kiểm soát dòng đi, dòng về và lưu trữ hàng hóa, dịch vụ cùng thông tin từ điểm xuất phát đến tiêu dùng. Supply chain management rộng hơn vì tích hợp sourcing, conversion và quan hệ giữa nhiều tổ chức.",points:["Mục tiêu là đúng sản phẩm, nơi, thời điểm và chi phí phù hợp.","Integrated logistics tối ưu toàn hệ thống thay vì từng chức năng riêng lẻ.","Giảm chi phí một khâu có thể làm tổng chi phí toàn chuỗi tăng."]},
        {title:"Network, lead time and order management",body:"Logistics channel gồm các bên tham gia lưu kho, xử lý, vận tải và thông tin. Lead time tính từ khi đặt đơn đến khi nhận; order management điều phối đơn khách hàng, đơn sản xuất và đơn mua.",points:["Lead time gồm truyền đơn, xử lý, chuẩn bị và vận chuyển.","Back order phát sinh khi sản phẩm được đặt nhưng tạm hết hàng.","Data interchange và M2M tăng khả năng theo dõi, phản ứng và tự động hóa."]},
        {title:"Transport documents and intermediaries",body:"Bill of lading là biên nhận hàng, bằng chứng hợp đồng vận chuyển và trong một số trường hợp là chứng từ sở hữu. Freight forwarder hoặc marshalling agent phối hợp gom hàng, chứng từ và đặt chỗ vận tải.",points:["Carrier vận chuyển hàng; forwarder tổ chức quá trình vận chuyển.","INCOTERMS phân chia chi phí, nhiệm vụ và rủi ro giao hàng giữa buyer và seller.","Common carrier cung cấp dịch vụ vận tải cho công chúng theo điều kiện được quản lý."]},
        {title:"Cost, resilience and green logistics",body:"Chiến lược tồn kho thấp và mạng lưới tập trung có thể làm quãng đường vận chuyển dài hơn. Khi nhiên liệu, tắc nghẽn và carbon trở nên quan trọng, doanh nghiệp phải cân bằng inventory cost, service level, resilience và emissions.",points:["Đặt kho gần nhu cầu giảm quãng đường nhưng tăng tồn kho.","Tăng tải trọng, giảm xe chạy rỗng và chuyển sang rail/water có thể giảm cả chi phí lẫn carbon.","Chia sẻ kho và giao hàng giúp tận dụng quy mô nhưng cần phối hợp dữ liệu và trách nhiệm."]}
      ],
      terms:[
        ["Business logistics","Coordinated activities that move and store goods efficiently from suppliers to customers.","Logistics kinh doanh"],
        ["Logistics management","Planning and controlling forward and reverse flows and storage to meet customer requirements.","Quản trị logistics"],
        ["Supply chain management","Integrated management of sourcing, conversion, logistics and relationships across the supply chain.","Quản trị chuỗi cung ứng"],
        ["Integrated logistics","Managing all logistics functions as one coordinated system.","Logistics tích hợp"],
        ["Logistics channel","The network of participants handling storage, transfer, transport and logistics information.","Kênh logistics"],
        ["Lead time","The total elapsed time from order placement to receipt.","Thời gian thực hiện đơn hàng"],
        ["Logistics data interchange","Electronic transmission of logistics information between connected systems.","Trao đổi dữ liệu logistics"],
        ["Machine-to-machine interface","Automated communication between machines for monitoring, reporting and control.","Giao tiếp máy với máy"],
        ["Market-positioned warehouse","A warehouse located near markets to replenish customers and shorten final delivery.","Kho gần thị trường"],
        ["Freight forwarder","An intermediary that organizes international shipments between shippers and carriers.","Người giao nhận vận tải"],
        ["Order management","Planning and controlling customer, production and purchasing order processes.","Quản trị đơn hàng"],
        ["Automated guided vehicle system","A system that automatically routes material-handling vehicles to set destinations.","Hệ thống xe tự hành"],
        ["Bill of lading","A transport receipt and contract-of-carriage document that may represent title to goods.","Vận đơn"],
        ["Common carrier","A regulated transport provider offering services to the public without special preference.","Người vận tải công cộng"],
        ["Agility","The ability to adapt rapidly and cost-effectively to market change.","Tính linh hoạt"],
        ["Back order","A customer order awaiting fulfilment because the product is currently out of stock.","Đơn hàng chờ"],
        ["Bar code","A machine-readable printed pattern used to identify and track items.","Mã vạch"],
        ["Capacity management","Planning and controlling resources so capacity matches expected demand.","Quản trị công suất"],
        ["Carbon footprint","The total greenhouse-gas emissions associated with an activity or organization.","Dấu chân carbon"],
        ["Core competency","A valuable, difficult-to-copy capability that can support many products or markets.","Năng lực cốt lõi"],
        ["Distribution channel","The parties involved in moving goods or services from producer to final user.","Kênh phân phối"],
        ["Distributor","An intermediary that buys products in quantity and resells them in smaller amounts.","Nhà phân phối"],
        ["INCOTERMS","International trade terms defining buyer and seller delivery responsibilities, costs and risks.","Điều kiện thương mại quốc tế"],
        ["Shipping network","Connected routes, ports, services and systems used to move cargo.","Mạng lưới vận tải biển"],
        ["Transport system","Infrastructure, vehicles and organizational systems used to move goods.","Hệ thống vận tải"]
      ],
      shortAnswers:[
        {q:"How does logistics differ from supply chain management?",a:"Logistics manages movement, storage and related information. Supply chain management is broader, integrating sourcing, production, logistics and relationships among suppliers, firms and customers."},
        {q:"Why can reducing inventory increase transport costs?",a:"Lower inventory often requires smaller, more frequent deliveries and longer emergency movements. These raise transport cost and emissions even though less money is tied up in stock."},
        {q:"What are the main functions of a bill of lading?",a:"It serves as a receipt for goods, evidence of the contract of carriage and, when negotiable, a document that helps control title to the goods."},
        {q:"How can firms reduce freight emissions?",a:"They can shorten routes, improve vehicle loading, reduce empty running, consolidate deliveries, shift from road or air to rail or water and use efficient vehicles or lower-carbon fuels."},
        {q:"Why is lead time important?",a:"Lead time affects inventory, customer service and planning reliability. Long or variable lead times require buffers and increase the risk of stockouts, delay and working-capital pressure."}
      ],
      essays:[
        {prompt:"Without logistics, there is no international trade. Do you agree or disagree?",thesis:"International trade cannot function at scale without logistics because physical movement, storage, documents and information connect contractual exchange with actual delivery.",outline:["Define trade and logistics.","Explain transport, warehousing, customs information and documentation.","Discuss service trade as a partial qualification.","Conclude that logistics is essential to goods trade and supports services."]},
        {prompt:"Is moving towards green logistics a must for every company?",thesis:"Companies should progressively adopt green logistics because energy, regulation and customer expectations affect long-term competitiveness, but priorities should follow their material emissions and operating constraints.",outline:["Define green logistics.","Benefits: cost, compliance, resilience and reputation.","Costs and infrastructure constraints.","Recommend measurement and phased actions with operational KPIs."]}
      ]
    },
    {
      id:"unit-9", num:9, title:"Insurance", midterm:true,
      summary:"Cơ chế pooling và risk transfer, bốn nguyên tắc pháp lý, marine insurance, policy types và xử lý claims.",
      theories:[
        {title:"How insurance works",body:"Insurance gom nhiều exposure units để tổn thất của số ít được chia sẻ cho cả nhóm. Insurer nhận premium và cam kết bồi thường tổn thất ngẫu nhiên thuộc phạm vi bảo hiểm.",points:["Pooling làm tổn thất bình quân dễ dự đoán hơn theo law of large numbers.","Fortuitous loss phải bất ngờ và xảy ra do ngẫu nhiên.","Risk transfer chuyển pure risk sang bên có năng lực tài chính tốt hơn."]},
        {title:"Indemnity and insurable interest",body:"Principle of indemnity giới hạn bồi thường ở mức tổn thất thực tế để insured không kiếm lời từ sự cố. Insurable interest yêu cầu người mua sẽ chịu thiệt hại tài chính nếu đối tượng bảo hiểm bị tổn thất.",points:["Deductible và policy limit có thể khiến tiền bồi thường thấp hơn tổn thất.","Indemnity giảm moral hazard.","Insurable interest ngăn biến hợp đồng bảo hiểm thành cá cược."]},
        {title:"Subrogation and utmost good faith",body:"Sau khi bồi thường, subrogation cho insurer quyền đòi bên thứ ba gây thiệt hại trong phạm vi đã trả. Utmost good faith yêu cầu các bên tiết lộ material facts và không trình bày sai.",points:["Concealment của thông tin trọng yếu có thể làm hợp đồng mất hiệu lực.","Warranty là cam kết phải tuân thủ theo điều khoản bảo hiểm.","Insured không được thu hồi hai lần cho cùng một tổn thất."]},
        {title:"Marine insurance and general average",body:"Ocean marine insurance bảo vệ tàu, hàng và trách nhiệm liên quan trước perils of the sea. General average chia sẻ hợp lý hy sinh hoặc chi phí đặc biệt được thực hiện có chủ ý để cứu hành trình chung.",points:["Cargo cover có thể lập theo voyage, time, mixed hoặc open policy.","Claim cần chứng minh sự kiện, phạm vi cover, nguyên nhân và giá trị tổn thất.","Doanh nghiệp phải phối hợp insurance với INCOTERMS để biết ai có nghĩa vụ mua cover."]}
      ],
      terms:[
        ["Insurance","A contract transferring specified fortuitous losses to an insurer in return for a premium.","Bảo hiểm"],
        ["Insurance policy","The contract stating the insured risks, conditions, exclusions and claims payable.","Hợp đồng bảo hiểm"],
        ["Insurer","The party that accepts risk and undertakes to pay covered losses.","Người bảo hiểm"],
        ["Insured","The person or entity protected by the insurance contract.","Người được bảo hiểm"],
        ["Policyholder","The person or entity that owns or purchases the insurance policy.","Chủ hợp đồng bảo hiểm"],
        ["Subject matter insured","The person, property or interest covered by an insurance policy.","Đối tượng bảo hiểm"],
        ["Premium","The payment required to purchase and maintain insurance cover.","Phí bảo hiểm"],
        ["Pooling of losses","Spreading losses suffered by a few members across a larger insured group.","Chia sẻ tổn thất"],
        ["Fortuitous loss","An unforeseen and accidental loss that occurs by chance.","Tổn thất ngẫu nhiên"],
        ["Risk transfer","The shifting of pure risk from the insured to the insurer.","Chuyển giao rủi ro"],
        ["Indemnification","Restoring the insured approximately to the financial position before the loss.","Bồi thường"],
        ["Principle of indemnity","The rule that insurance should not pay more than the actual covered loss.","Nguyên tắc bồi thường"],
        ["Insurable interest","A financial interest that would be harmed by loss of the insured subject.","Quyền lợi có thể bảo hiểm"],
        ["Subrogation","The insurer's right, after payment, to recover from a responsible third party.","Thế quyền"],
        ["Utmost good faith","The duty to disclose material facts honestly and completely.","Trung thực tuyệt đối"],
        ["Concealment","Failure to disclose a material fact relevant to the insurance risk.","Che giấu thông tin"],
        ["Warranty","A policy promise or condition that the insured must observe.","Cam kết bảo hiểm"],
        ["General average","Shared contribution to extraordinary sacrifice or expense incurred to save a maritime venture.","Tổn thất chung"],
        ["Ocean marine insurance","Insurance covering vessels, cargo and related liabilities against marine perils.","Bảo hiểm hàng hải"],
        ["Voyage policy","Marine insurance covering a specified voyage.","Đơn bảo hiểm chuyến"],
        ["Time policy","Marine insurance covering risks during a specified period.","Đơn bảo hiểm thời hạn"],
        ["Mixed policy","Marine insurance combining a specified voyage with a specified period.","Đơn bảo hiểm hỗn hợp"],
        ["Open policy","Continuing cover for multiple shipments declared under agreed terms.","Đơn bảo hiểm bao"],
        ["Claim","A formal request for payment under an insurance policy.","Yêu cầu bồi thường"]
      ],
      shortAnswers:[
        {q:"What are the four common elements of insurance?",a:"They are pooling of losses, payment of fortuitous losses, transfer of pure risk to the insurer and indemnification of the insured after a covered loss."},
        {q:"Why is the principle of indemnity important?",a:"It restores the insured without allowing profit from loss. This preserves insurance's protective purpose and reduces incentives to cause or exaggerate losses."},
        {q:"What is insurable interest?",a:"Insurable interest exists when a person or entity would suffer a genuine financial loss if the insured person, property or legal interest were damaged."},
        {q:"How does subrogation prevent double recovery?",a:"After paying the claim, the insurer obtains the insured's recovery rights against the responsible third party, preventing the insured from collecting twice for the same loss."},
        {q:"What is general average?",a:"It is the proportional sharing of an extraordinary sacrifice or expense intentionally incurred to protect a ship, cargo and common maritime venture from a shared danger."}
      ],
      essays:[
        {prompt:"Why do businesses insure goods moving across international borders?",thesis:"Businesses insure traded goods because long routes expose cargo to loss, damage and shared maritime expenses that could disrupt cash flow and exceed a firm's ability to absorb loss.",outline:["Identify physical and financial risks in transit.","Explain risk transfer, indemnity and continuity.","Discuss marine perils, theft, handling and general average.","Link cover to cargo value, route, INCOTERMS and exclusions."]},
        {prompt:"Does insurance eliminate business risk?",thesis:"Insurance transfers specified financial consequences but does not eliminate operational risk; firms must still prevent losses, comply with policy conditions and retain exclusions, deductibles and uncovered consequences.",outline:["Define risk transfer and policy scope.","Explain covered loss and indemnification.","Discuss exclusions, deductibles, reputation and disruption.","Conclude with combined prevention and insurance strategy."]}
      ]
    },
    {
      id:"unit-10", num:10, title:"Taxation", midterm:false,
      summary:"Các loại thuế, progressive và regressive taxation, VAT, avoidance và evasion, tax havens và vai trò của chính phủ.",
      theories:[
        {title:"Direct and indirect taxes",body:"Direct tax đánh trực tiếp vào thu nhập, lợi nhuận hoặc tài sản; indirect tax phát sinh qua giao dịch, hàng hóa hoặc dịch vụ. Gánh nặng kinh tế cuối cùng có thể khác người có nghĩa vụ nộp thuế theo luật.",points:["Income tax áp dụng cho thu nhập cá nhân; corporation tax áp dụng cho lợi nhuận công ty.","Sales taxes và excise duties thường được chuyển một phần vào giá.","Phân tích thuế cần tách tax base, statutory rate và effective burden."]},
        {title:"Progressive and regressive taxation",body:"Progressive tax áp dụng tỷ lệ cao hơn khi thu nhập tăng. Regressive tax chiếm tỷ trọng thu nhập lớn hơn ở người thu nhập thấp, ngay cả khi mọi người trả cùng mức tiền hoặc cùng tỷ lệ trên tiêu dùng.",points:["Flat tax dùng một mức thuế suất không đổi.","Indirect consumption taxes có thể mang tính regressive.","Đánh giá công bằng cần xét cả hệ thống thuế và chi tiêu công."]},
        {title:"VAT and transaction taxes",body:"VAT được thu trên phần giá trị tăng thêm ở mỗi công đoạn: output VAT trừ input VAT đủ điều kiện. Stamp duty đánh vào giao dịch cụ thể; capital gains tax đánh vào lợi nhuận từ bán tài sản.",points:["VAT không nhằm đánh thuế lặp lại toàn bộ giá trị ở mỗi công đoạn.","Doanh nghiệp thu VAT thay cho nhà nước nhưng người tiêu dùng thường chịu gánh nặng cuối cùng.","Hóa đơn và hồ sơ đầu vào quyết định khả năng khấu trừ."]},
        {title:"Planning, avoidance and evasion",body:"Tax avoidance sử dụng biện pháp hợp pháp để giảm thuế; tax evasion che giấu hoặc khai sai và là bất hợp pháp. Tax haven có mức thuế thấp và thường được dùng trong cấu trúc quốc tế; money laundering che giấu nguồn gốc tiền bất hợp pháp.",points:["Legal không luôn đồng nghĩa với phù hợp đạo đức hoặc ít rủi ro danh tiếng.","Loophole là khoảng trống hoặc ngoại lệ ngoài ý định chính sách.","Chính phủ đánh thuế để tài trợ hàng hóa công, phân phối lại và điều chỉnh ngoại ứng."]}
      ],
      terms:[
        ["Income tax","A tax imposed on an individual's earnings and other taxable income.","Thuế thu nhập cá nhân"],
        ["Corporation tax","A tax imposed on company profits.","Thuế thu nhập doanh nghiệp"],
        ["Progressive tax","A tax whose rate increases as the taxable amount or income rises.","Thuế lũy tiến"],
        ["Flat tax","A tax charged at one constant rate across the tax base.","Thuế suất cố định"],
        ["Indirect tax","A tax on transactions, goods or services rather than directly on income.","Thuế gián thu"],
        ["Regressive tax","A tax that takes a larger percentage of income from lower-income taxpayers.","Thuế lũy thoái"],
        ["Value-added tax (VAT)","A tax collected on value added at each stage of production and distribution.","Thuế giá trị gia tăng"],
        ["Stamp duty","A tax imposed on specified legal or property transactions.","Thuế trước bạ / thuế giao dịch"],
        ["Capital gains tax","A tax on profit made from selling an asset.","Thuế thu nhập từ vốn"],
        ["Capital transfer tax","A tax on property, money or assets transferred to another person.","Thuế chuyển giao tài sản"],
        ["Inheritance tax","A tax charged on assets transferred after a person's death.","Thuế thừa kế"],
        ["Wealth tax","A recurring tax on a person's net wealth or specified assets.","Thuế tài sản"],
        ["Tax avoidance","Legal arrangements that reduce tax liability.","Tránh thuế hợp pháp"],
        ["Tax evasion","Illegal concealment or misrepresentation intended to avoid tax.","Trốn thuế"],
        ["Tax loss","A tax result in which allowable expenses exceed taxable income.","Lỗ tính thuế"],
        ["Tax haven","A jurisdiction offering exceptionally low taxes and favourable financial rules.","Thiên đường thuế"],
        ["Money laundering","Disguising the illegal origin of money through transactions or entities.","Rửa tiền"],
        ["Tax loophole","An unintended gap or exception in tax law that reduces liability.","Kẽ hở thuế"],
        ["Tax allowance","An amount or relief that reduces taxable income or tax payable.","Khoản giảm trừ thuế"],
        ["Withholding tax","Tax deducted at source before income is paid to its recipient.","Thuế khấu trừ tại nguồn"]
      ],
      shortAnswers:[
        {q:"How does a progressive tax differ from a regressive tax?",a:"A progressive tax takes a higher percentage as income rises. A regressive tax places a proportionally heavier burden on lower-income people."},
        {q:"Why is VAT called a value-added tax?",a:"Each business accounts for tax on its sales and deducts eligible tax on purchases, so tax is collected on the value added at that stage."},
        {q:"How does tax avoidance differ from tax evasion?",a:"Tax avoidance uses legal arrangements to reduce liability. Tax evasion illegally hides income, falsifies information or violates tax rules to escape payment."},
        {q:"Why can an indirect tax be regressive?",a:"Lower-income households spend a larger share of income on consumption, so the same sales-tax rate can take a greater proportion of their income."},
        {q:"Why do governments impose taxes?",a:"Taxes finance public services and infrastructure, redistribute income, correct harmful externalities, influence behaviour and provide resources for administration, security and social protection."}
      ],
      essays:[
        {prompt:"Government intervention through taxation is necessary to fund education, health and early-stage technologies. To what extent do you agree?",thesis:"Taxation is necessary to fund public goods and investments markets underprovide, but spending and tax design must be transparent, efficient and proportionate to avoid unnecessary economic distortion.",outline:["Explain public goods and market failure.","Benefits for education, health, infrastructure and research.","Discuss tax burden, inefficiency and government failure.","Support necessary but accountable and well-designed intervention."]},
        {prompt:"Some people argue that excessive taxation and regulation are bad for business and interfere with market forces. To what extent do you agree?",thesis:"Excessive or unpredictable intervention can weaken investment, but well-designed taxation and regulation create infrastructure, trust and fair competition that markets require.",outline:["State the tension between freedom and public purpose.","Costs of high, complex or unstable taxation.","Benefits: public services, externalities and market rules.","Conclude with simple, predictable and evidence-based intervention."]}
      ]
    }
  ]
};

// English-first theory lessons. Vietnamese is kept only as an in-context aid
// for key terms and specialist vocabulary, matching the requested study flow.
const ESP3_ENGLISH_THEORY = [
  {
    summary: "Cross-border transactions, globalization, MNEs, FDI, institutions and the organization of international value creation.",
    theories: [
      {title:"International and domestic business",body:"International business (kinh doanh quốc tế) refers to business transactions conducted across national borders to satisfy the needs of individuals and organizations. Domestic business (kinh doanh nội địa) takes place within one country, so it normally operates under one currency, one main legal system and a more familiar cultural environment.",points:["Exporting (xuất khẩu) means selling goods or services produced in one country to another; importing (nhập khẩu) means buying them from abroad.","International business also includes foreign investment, international production, licensing and cross-border financing.","Cross-border firms must manage currency conversion, different laws, cultural distance, political risk and unequal resource availability."]},
      {title:"Globalization, internationalization and regional integration",body:"Economic globalization (toàn cầu hóa kinh tế) is the growing integration and interdependence of countries, markets and economic actors. Internationalization (quốc tế hóa) simply means extending activities across borders. Regional integration (hội nhập khu vực) is more deliberate: nearby countries use formal agreements to increase trade and investment.",points:["Interdependence (sự phụ thuộc lẫn nhau) means that firms and countries rely on one another for inputs, technology, finance and customers.","Technology, transport and logistics reduce the cost of coordinating activities across distance.","Regional agreements can reduce trade barriers, enlarge markets and allow firms to exploit economies of scale (lợi thế kinh tế theo quy mô)."]},
      {title:"MNEs, ownership and foreign direct investment",body:"A multinational enterprise or MNE (doanh nghiệp đa quốc gia) controls and coordinates value-adding activities in at least two countries. Foreign direct investment or FDI (đầu tư trực tiếp nước ngoài) is a long-term investment intended to establish control or significant influence over a foreign operation.",points:["An affiliate (công ty liên kết) normally involves a significant minority interest; a subsidiary (công ty con) is controlled through majority ownership; a wholly owned subsidiary is owned 100%.","FDI differs from portfolio investment because the investor seeks managerial influence and makes a less liquid, longer-term commitment.","FDI flow measures investment during a period; FDI stock (lượng vốn FDI tích lũy) measures the accumulated value at a particular time."]},
      {title:"Invention, innovation, technology and institutions",body:"An invention (phát minh) is a new idea, product or process. It becomes an innovation (đổi mới sáng tạo) when it is commercially applied. Technology is the accumulated stock of innovations that allows economic actors to produce goods and services. Institutions (thể chế) are the rules and accepted practices that shape interaction.",points:["Formal institutions (thể chế chính thức) include written laws, contracts, regulations and company policies.","Informal institutions (thể chế phi chính thức) include customs, etiquette, traditions and accepted behaviour.","Technology encourages globalization by lowering communication costs and enabling firms to divide and coordinate work internationally."]},
      {title:"GATT, WTO and liberalization",body:"The General Agreement on Tariffs and Trade or GATT created a framework for negotiating trade concessions and reducing barriers. The World Trade Organization or WTO (Tổ chức Thương mại Thế giới) administers a broader system of trade rules and provides a dispute-settlement mechanism (cơ chế giải quyết tranh chấp).",points:["GATT was primarily an agreement, whereas the WTO is an international organization.","Liberalization (tự do hóa) means reducing government restrictions on trade, markets and capital flows.","Liberalization makes trade and FDI easier, but fast-moving international capital can also reduce a government's policy independence."]},
      {title:"SMEs, global value chains and production networks",body:"Small and medium-sized enterprises or SMEs (doanh nghiệp nhỏ và vừa) can participate in international business as niche exporters, innovators and suppliers to large MNEs. A global value chain or GVC (chuỗi giá trị toàn cầu) follows the sequence of activities from conception to final consumption; a global production network or GPN (mạng lưới sản xuất toàn cầu) emphasizes the actors and relationships involved.",points:["SMEs are often flexible and innovative, but they usually have less finance, market power and international experience than large MNEs.","Producer-driven chains are led by technology- or production-intensive firms; buyer-driven chains are led by retailers or brand owners.","Upstream activities (hoạt động thượng nguồn) concern inputs and extraction; downstream activities (hoạt động hạ nguồn) concern processing, distribution and sales."]},
      {title:"Outsourcing, offshoring and nearshoring",body:"Outsourcing (thuê ngoài) answers who performs an activity: an external firm does the work. Offshoring (chuyển hoạt động ra nước ngoài) answers where the activity is performed: it is moved abroad. Nearshoring (chuyển sang nước lân cận) means relocating it to a nearby foreign country.",points:["Outsourcing may be domestic or international, so it is not automatically offshoring.","Captive offshoring moves work to the company's own foreign affiliate; offshore outsourcing uses an independent foreign supplier.","Nearshoring can reduce transport time, time-zone differences and the liability of foreignness (bất lợi do hoạt động ở thị trường xa lạ)."]},
      {title:"FSA, CSA and lessons from international cases",body:"A firm-specific advantage or FSA (lợi thế riêng của doanh nghiệp) is a company-owned resource or capability, such as a brand, technology or supply-chain system. A country-specific advantage or CSA (lợi thế riêng của quốc gia) belongs to a location, such as skilled labour, natural resources, infrastructure or market size. Success depends on matching the two.",points:["Starbucks struggled in Australia because rapid expansion and its American format did not fit a strong local café culture.","Walmart failed in Germany after underestimating regulation, competitors and customer preferences, but adapted more effectively in China through JD.com, mobile payments and smaller stores.","IKEA's first Japanese entry failed because its large self-assembly products did not fit local homes; its re-entry used home visits, selected products and delivery services while preserving its core model."]}
    ]
  },
  {
    summary: "Trade theories, gains from specialization, the balance of trade, trade-promotion tools and barriers to trade.",
    theories: [
      {title:"Trade and the balance of trade",body:"International trade (thương mại quốc tế) is the purchase, sale or exchange of goods and services across national borders. A country records a trade surplus (thặng dư thương mại) when export value exceeds import value and a trade deficit (thâm hụt thương mại) when imports exceed exports.",points:["A surplus does not automatically prove that an economy is healthy, and a deficit does not automatically prove failure.","One country's trade deficit is matched by surpluses elsewhere in the trading system.","Global value chains connect trade in goods and services because production stages, finance and logistics may occur in different countries."]},
      {title:"Absolute and comparative advantage",body:"Absolute advantage (lợi thế tuyệt đối) compares direct productivity: who can produce more with the same resources. Comparative advantage (lợi thế so sánh) compares opportunity cost (chi phí cơ hội): who gives up less of another product when producing one more unit.",points:["Two countries can both gain from trade even when one has an absolute advantage in every product.","Each country should specialize where its opportunity cost is relatively lower.","A mutually beneficial terms of trade (tỷ lệ trao đổi) normally lies between the two countries' opportunity costs."]},
      {title:"Factor endowments and the product life cycle",body:"The Heckscher–Ohlin theory predicts that countries export products that intensively use their relatively abundant and inexpensive factors of production. The Leontief paradox (nghịch lý Leontief) showed that early US data did not fit this simple prediction. The international product life cycle or IPLC explains how production locations change as products mature.",points:["New products are often produced near demanding customers and research-and-development capabilities.","As design and production become standardized, manufacturing may move to lower-cost locations.","Human-capital quality, technology and measurement problems mean that capital–labour comparisons require care."]},
      {title:"Trade promotion and trade barriers",body:"Governments promote trade through subsidies (trợ cấp), export financing, loan guarantees and foreign trade zones. They restrict trade through tariffs (thuế quan), quotas (hạn ngạch), embargoes (cấm vận), local-content requirements and voluntary export restraints.",points:["Barriers may protect employment, national security or infant industries (ngành non trẻ).","They can also raise prices, reduce consumer choice, protect inefficient firms and provoke retaliation.","Dumping (bán phá giá) means selling abroad at an unfairly low price, often below cost or the home-market price."]}
    ]
  },
  {
    summary: "The balance of payments, free trade, protectionism, liberalization and the rules of the multilateral trading system.",
    theories: [
      {title:"Balance of payments",body:"The balance of payments or BOP (cán cân thanh toán) is a systematic record of economic transactions between a country's residents and the rest of the world during a period. The current account records goods, services, income and current transfers; the financial account records transactions in financial assets and liabilities.",points:["The balance of trade is only one part of the BOP and measures exports minus imports.","Individual accounts may show a surplus or deficit, while double-entry accounting and statistical adjustments keep the overall record balanced.","A trade balance alone cannot establish whether an economy is successful; financing, productivity and sustainability also matter."]},
      {title:"Free trade and protectionism",body:"Free trade (thương mại tự do) aims to let goods and services move with limited artificial barriers. Protectionism (chủ nghĩa bảo hộ) supports domestic producers through tariffs, subsidies and non-tariff measures. The policy debate compares long-run gains from competition with short-run adjustment costs.",points:["Protection may preserve jobs temporarily but can delay the restructuring of inefficient industries.","Free trade does not mean the absence of all rules; safety, competition and environmental standards can remain.","Good policy balances consumer welfare, employment, national security and strategic capability."]},
      {title:"Liberalization and core trade-policy rules",body:"Trade liberalization (tự do hóa thương mại) is the gradual reduction or removal of trade barriers. Trade policy includes the laws, regulations, agreements and negotiating positions used to create predictable market access.",points:["Most-favoured-nation treatment or MFN (đối xử tối huệ quốc) normally extends a trade advantage granted to one WTO member to all relevant members.","National treatment (đối xử quốc gia) requires imported products, after entry, to receive treatment no less favourable than similar domestic products.","Transparency (tính minh bạch) helps firms understand and predict the conditions under which they may trade."]},
      {title:"Bilateral and multilateral cooperation",body:"A bilateral agreement (hiệp định song phương) governs trade between two countries. A multilateral agreement (hiệp định đa phương) creates common rights and obligations for many members. Multilateral rules reduce discrimination but are harder to negotiate because more interests must be reconciled.",points:["The WTO administers trade agreements and provides procedures for settling disputes.","Contingent protection (bảo hộ có điều kiện) includes anti-dumping duties, countervailing duties and safeguards when specified harm is demonstrated.","Competition policy protects market competition and consumers, whereas trade remedies usually respond to alleged injury suffered by domestic producers."]}
    ]
  },
  {
    summary: "FDI motives, investment incentives, licensing, joint ventures, acquisitions, mergers and control risks.",
    theories: [
      {title:"FDI and portfolio investment",body:"Foreign portfolio investment (đầu tư danh mục nước ngoài) purchases foreign shares or debt without seeking managerial control and is usually easier to sell. Foreign direct investment or FDI establishes or acquires ownership in a foreign business in order to control or share control of production, research, distribution or sales.",points:["FDI locks in capital for longer and therefore requires deeper strategic analysis.","Common motives are market seeking, resource seeking, efficiency seeking and knowledge seeking.","A viable project (dự án khả thi) needs realistic expected returns, reliable financing and an operating model that can work in the host country."]},
      {title:"The investment environment",body:"Before investing, a firm evaluates cash flow, interest rates, working capital, labour law, competition law, political intervention and investment incentives (ưu đãi đầu tư). Governments often offer stronger incentives in regions where they want employment and development.",points:["Incentives may include cash grants, tax credits, accelerated depreciation (khấu hao nhanh) and soft loans (vay ưu đãi).","An incentive cannot rescue a project that lacks demand, capability or sound economics.","Analysis should include political and legal risk, currency exposure and the ability to repatriate profits (chuyển lợi nhuận về nước)."]},
      {title:"Entry and ownership choices",body:"A company may enter through a distributor, a sales subsidiary, licensing, a joint venture or a wholly owned operation. Every mode creates a trade-off among speed, required capital, local knowledge, risk and control.",points:["Licensing (cấp phép) needs less capital but may weaken quality control and expose valuable know-how.","A joint venture (liên doanh) shares investment, risk and local knowledge, but partners may disagree about strategy and control.","A wholly owned subsidiary offers maximum control and profit retention, but the investor bears the full cost and risk."]},
      {title:"Mergers, acquisitions and buyouts",body:"An acquisition (mua lại doanh nghiệp) occurs when one company gains control of another; a merger (sáp nhập) combines firms into one organization. M&A can expand market share, reduce duplicated costs and create economies of scale, but value is destroyed when buyers overpay or overestimate synergy (hiệp lực).",points:["A horizontal merger joins competitors at the same industry stage; a vertical merger joins connected production or distribution stages.","A raid rapidly buys target shares on the market; a takeover bid makes a public offer to shareholders.","A leveraged buyout or LBO uses substantial debt; a management buyout or MBO is led by the target company's managers."]}
    ]
  },
  {
    summary: "Foreign-exchange markets, quotations, spot and forward deals, hedging, arbitrage, speculation and currency derivatives.",
    theories: [
      {title:"The market and exchange-rate quotations",body:"The foreign exchange market (thị trường ngoại hối) allows currencies to be bought and sold and determines exchange rates. A dealer quotes a bid rate (tỷ giá mua) at which it buys the base currency and an ask rate (tỷ giá bán) at which it sells; the difference is the bid–ask spread.",points:["In a quotation, the base currency is the unit being priced and the quoted currency expresses its value.","Firms use the market to convert revenue, pay foreign suppliers, invest abroad and manage currency risk.","Exchange rates respond to supply and demand, inflation, interest rates, growth expectations and government policy."]},
      {title:"Spot and forward transactions",body:"A spot rate (tỷ giá giao ngay) applies to currency delivery almost immediately, commonly within two business days. A forward rate (tỷ giá kỳ hạn) is agreed today for an exchange on a specified future date, allowing a firm to lock in the home-currency value of a future payment or receipt.",points:["A forward contract creates an obligation for both parties to transact at the agreed rate.","A forward premium exists when the forward rate is above the spot rate under the quotation being used.","Hedging reduces uncertainty, but a fixed forward rate also removes the benefit of a favourable currency movement."]},
      {title:"Hedging, arbitrage and speculation",body:"Hedging (phòng ngừa rủi ro) protects an existing business exposure such as a foreign receivable or payable. Arbitrage (kinh doanh chênh lệch giá) uses nearly simultaneous trades to exploit a current price difference. Speculation (đầu cơ) deliberately accepts risk in the hope of profiting from a predicted future movement.",points:["A hedger begins with an underlying commercial exposure.","An arbitrage opportunity is valuable only when the price difference exceeds transaction costs.","Speculation can create large gains or losses because future exchange rates are uncertain."]},
      {title:"Derivatives and exchange-rate systems",body:"Currency swaps, options and futures are derivatives (công cụ phái sinh). An option gives the buyer a right but not an obligation; a futures contract is standardized and creates an obligation. Under a fixed-rate system, the central bank defends a target or band; under a floating system, market supply and demand mainly determine the rate.",points:["A currency swap combines a purchase and sale of currencies for two different value dates.","An option buyer pays a premium (phí quyền chọn) for flexibility and downside protection.","Central banks may still intervene in a managed float by buying or selling currencies."]}
    ]
  },
  {
    summary: "Open account, advance payment, documentary collections, letters of credit, bills of exchange and bank roles.",
    theories: [
      {title:"The payment-risk spectrum",body:"International payment methods distribute risk differently between exporter and importer. Advance payment (thanh toán trước) is safest for the exporter but riskiest for the importer; open account (ghi sổ) reverses that position because goods and documents are released before payment.",points:["The choice depends on trust, bargaining power, country risk, transaction value and bank cost.","No method is simultaneously the safest and cheapest for both sides.","The sales contract and payment method must use consistent documents, deadlines, currencies and delivery terms."]},
      {title:"Documentary collections",body:"In a documentary collection (nhờ thu kèm chứng từ), the exporter draws a bill of exchange and asks banks to collect payment or acceptance. Commercial documents or documents of title accompany the draft, but the banks handle documents without guaranteeing that the importer will pay.",points:["Documents against payment or D/P releases documents only when the importer pays.","Documents against acceptance or D/A releases them when the importer accepts a time draft and promises to pay later.","D/A creates greater exporter risk because control of the goods is released before cash is received."]},
      {title:"Documentary letters of credit",body:"A documentary letter of credit or L/C (thư tín dụng chứng từ) is an independent undertaking by the issuing bank to pay when the exporter presents complying documents. Banks deal with documents, not the physical goods, so document accuracy is essential.",points:["The advising bank authenticates and communicates the L/C to the beneficiary.","A confirming bank adds its own independent payment undertaking and reduces issuing-bank or country risk.","A discrepancy (sai biệt chứng từ) may allow the bank to refuse payment or request the importer's waiver."]},
      {title:"Drafts and L/C variations",body:"A sight draft (hối phiếu trả ngay) is payable on presentation; a usance or time draft is payable on a future date. Different L/C forms change whether the credit can be cancelled, transferred, advanced, renewed or used only when the underlying obligation is not performed.",points:["An irrevocable L/C cannot be amended or cancelled without the required parties' consent.","Transferable and back-to-back credits can support transactions involving intermediaries.","A standby L/C functions as a backup: payment is normally demanded only after the applicant fails to perform."]}
    ]
  },
  {
    summary: "The marketing concept, research, segmentation, customer value, the marketing mix, channels, branding and digital marketing.",
    theories: [
      {title:"Selling and marketing concepts",body:"Selling focuses on persuading customers to buy what the company has already produced. Marketing (tiếp thị) begins with customer needs and designs an offering that creates value. It is therefore an organization-wide responsibility, not simply advertising or the work of one department.",points:["Marketers may identify existing needs or reveal new ways of satisfying them.","Business-to-business or B2B markets include materials, components, equipment and services purchased by organizations.","Even an excellent product needs an appropriate target segment, price, channel and communication strategy."]},
      {title:"Needs, value and satisfaction",body:"Needs (nhu cầu cơ bản) are basic human requirements; wants (mong muốn) are specific forms those needs take; demands (nhu cầu có khả năng thanh toán) are wants supported by willingness and ability to pay. Customer value compares perceived benefits with total costs, while satisfaction compares performance with expectations.",points:["Performance below expectations creates dissatisfaction; matching them creates satisfaction; exceeding them may create delight.","Value includes tangible and intangible benefits as well as price, time, effort and total cost of ownership.","Advertising should not create expectations that the real customer experience cannot meet."]},
      {title:"Research, segmentation and target markets",body:"Market research (nghiên cứu thị trường) collects and analyses data for a specific marketing decision. Market segmentation divides customers into groups with different needs or behaviour. The firm then selects a target market (thị trường mục tiêu) that it can serve effectively and profitably.",points:["Research reduces uncertainty but cannot eliminate market risk.","A useful segment should be measurable, reachable, sufficiently large and meaningfully different.","A product concept should be tested with target customers before a full launch."]},
      {title:"The marketing mix, channels and brands",body:"The marketing mix coordinates Product, Price, Place and Promotion—the 4Ps. Communication channels carry messages; distribution channels move offerings to users; service channels such as warehouses, transport providers, banks and insurers facilitate transactions.",points:["Changing one element of the mix usually affects the effectiveness of the others.","A brand identifies an offering; a trademark (nhãn hiệu được bảo hộ) gives legal protection to a name, symbol or sign.","Digital marketing adds data, targeting and personalization, but it does not automatically replace every traditional channel."]}
    ]
  },
  {
    summary: "The flow of goods, integrated logistics, order management, transport networks, documentation and green logistics.",
    theories: [
      {title:"Logistics and supply chains",body:"Logistics management (quản trị logistics) plans and controls the forward and reverse flow and storage of goods, services and related information from origin to consumption. Supply chain management is broader because it integrates sourcing, conversion, logistics and relationships across several organizations.",points:["The operational goal is to deliver the right product, to the right place, at the right time and at an appropriate total cost.","Integrated logistics (logistics tích hợp) optimizes the whole system instead of treating transport, inventory and warehousing separately.","Reducing the cost of one activity can increase total supply-chain cost if it creates delay, stockouts or expensive transport elsewhere."]},
      {title:"Networks, lead time and order management",body:"A logistics channel (kênh logistics) is the network of parties that store, handle, transport and exchange information about goods. Lead time (thời gian thực hiện đơn hàng) runs from order placement to receipt. Order management coordinates customer, production and purchasing orders.",points:["Lead time includes order transmission, processing, preparation and transportation.","A back order (đơn hàng chờ) exists when a product has been ordered but is temporarily out of stock.","Data interchange and machine-to-machine communication improve tracking, response speed and automation."]},
      {title:"Transport documents and intermediaries",body:"A bill of lading or B/L (vận đơn) is a receipt for goods, evidence of the contract of carriage and, in some forms, a document of title. A freight forwarder (người giao nhận vận tải) organizes international shipments, consolidates cargo, prepares documents and books transport with carriers.",points:["The carrier physically transports the cargo; the forwarder coordinates the process.","INCOTERMS allocate delivery tasks, costs and risks between buyer and seller; they do not replace the sales contract.","A common carrier offers regulated transport services to the public without special preference."]},
      {title:"Cost, resilience and green logistics",body:"Low-inventory strategies and centralized networks may increase transport distance and vulnerability. When fuel cost, congestion and carbon emissions matter, firms must balance inventory cost, service level, resilience (khả năng chống chịu) and environmental impact.",points:["Warehouses closer to demand shorten final delivery but may require more facilities and inventory.","Better vehicle loading, fewer empty journeys and a shift from road or air to rail or water can reduce both cost and emissions.","Shared warehousing and deliveries create scale benefits but require coordinated data, service standards and responsibility."]}
    ]
  },
  {
    summary: "Risk pooling and transfer, four legal principles, marine insurance, policy types and the claims process.",
    theories: [
      {title:"How insurance works",body:"Insurance (bảo hiểm) pools many exposure units so that losses suffered by a few members are shared across the group. In return for a premium (phí bảo hiểm), the insurer accepts specified pure risks and promises to indemnify covered fortuitous losses.",points:["Pooling makes average losses more predictable through the law of large numbers (quy luật số lớn).","A fortuitous loss (tổn thất ngẫu nhiên) must be unforeseen and accidental rather than deliberately created.","Risk transfer moves the financial consequences of pure risk to an insurer with greater capacity to absorb them."]},
      {title:"Indemnity and insurable interest",body:"The principle of indemnity (nguyên tắc bồi thường) aims to restore the insured approximately to the financial position held before the loss, not create a profit. Insurable interest (quyền lợi có thể bảo hiểm) exists when the policyholder would suffer a genuine financial loss if the insured subject were damaged.",points:["A deductible and policy limit may make the claim payment lower than the actual loss.","Indemnity reduces moral hazard (rủi ro đạo đức) by removing the opportunity to profit from damage.","Insurable interest prevents an insurance contract from becoming a wager on unrelated property or lives."]},
      {title:"Subrogation and utmost good faith",body:"After paying a claim, subrogation (thế quyền) gives the insurer the right to recover from a responsible third party up to the amount paid. Utmost good faith (trung thực tuyệt đối) requires the parties to disclose material facts honestly and avoid misrepresentation.",points:["Concealment (che giấu thông tin) of a material fact may make the policy void or allow a claim to be rejected.","A warranty is a promise or policy condition that the insured must observe.","Subrogation helps prevent the insured from recovering twice for the same loss."]},
      {title:"Marine insurance and general average",body:"Ocean marine insurance (bảo hiểm hàng hải) covers ships, cargo and related liabilities against marine perils. General average (tổn thất chung) requires all interests in a maritime venture to contribute proportionally when an extraordinary sacrifice or expense is intentionally made to save the common adventure.",points:["Cargo may be insured under voyage, time, mixed or open policies.","A claim must establish the event, policy coverage, cause of loss and amount of damage.","Firms should coordinate insurance with INCOTERMS to identify whether the buyer or seller must arrange cover."]}
    ]
  },
  {
    summary: "Direct and indirect taxes, progressive and regressive taxation, VAT, avoidance, evasion and tax havens.",
    theories: [
      {title:"Direct and indirect taxes",body:"A direct tax (thuế trực thu) is imposed directly on income, profit or property. An indirect tax (thuế gián thu) arises through transactions, goods or services. The person legally required to pay a tax may not bear its final economic burden if the cost is shifted through prices or wages.",points:["Income tax applies to individual taxable income; corporation tax applies to company profits.","Sales taxes and excise duties may be passed partly or fully to customers through higher prices.","Tax analysis should separate the tax base, statutory rate and effective economic burden."]},
      {title:"Progressive, flat and regressive taxation",body:"A progressive tax (thuế lũy tiến) applies a higher rate as taxable income rises. A flat tax uses one constant rate. A regressive tax (thuế lũy thoái) takes a larger percentage of income from lower-income people, even when everyone pays the same monetary amount or consumption-tax rate.",points:["Indirect consumption taxes can be regressive because poorer households spend a larger share of their income.","A flat statutory rate is not necessarily neutral when allowances and the distribution of income differ.","Fairness should be judged across the whole tax-and-spending system, not from one tax in isolation."]},
      {title:"VAT and transaction taxes",body:"Value-added tax or VAT (thuế giá trị gia tăng) is collected on the value added at each production and distribution stage: a registered firm normally deducts eligible input VAT from output VAT. Stamp duty applies to specified transactions, while capital gains tax applies to profit from selling assets.",points:["VAT is designed to avoid repeatedly taxing the full product value at every stage.","Businesses collect VAT for the government, but final consumers normally bear the economic burden.","Valid invoices and input records determine whether a business may claim a deduction."]},
      {title:"Tax planning, avoidance and evasion",body:"Tax avoidance (tránh thuế hợp pháp) uses legal arrangements to reduce liability; tax evasion (trốn thuế) illegally hides income or falsifies information. A tax haven is a low-tax jurisdiction often used in international structures. Money laundering disguises the illegal origin of funds and is distinct from ordinary tax planning.",points:["A legal arrangement may still create ethical, regulatory or reputational risk.","A tax loophole (kẽ hở thuế) is a gap or exception that produces a result outside the law's intended policy.","Governments tax to finance public goods, redistribute income, influence behaviour and correct harmful externalities."]}
    ]
  }
];

window.ESP3_DATA.units.forEach((unit, index) => Object.assign(unit, ESP3_ENGLISH_THEORY[index]));

// Gap-filling bank. Units 2, 3, 4 and 9 follow the definition-led wording
// found in the supplied ESP231 revision sheets; the remaining units are
// generated from their complete key-term banks so every unit is covered.
const gap = (prompt, answer, accept = []) => ({ prompt, answer, accept });
const ESP3_SOURCE_GAPS = {
  "unit-2": [
    gap("The purchase, sale or exchange of goods and services across national borders is called _______.", "International trade"),
    gap("The theory that encourages exports and restricts imports to accumulate wealth in precious metals is called _______.", "Mercantilism"),
    gap("When the value of a nation's exports is greater than the value of its imports, it has a _______.", "Trade surplus"),
    gap("When the value of a country's imports is greater than the value of its exports, it has a _______.", "Trade deficit"),
    gap("Sending goods to another country for sale or trade is called _______.", "Exporting", ["Export"]),
    gap("The theory that nations should specialize in goods they can produce more efficiently than anyone else is the _______.", "Theory of absolute advantage", ["Absolute advantage"]),
    gap("Bringing goods in from another country for sale or trade is called _______.", "Importing", ["Import"]),
    gap("The theory that nations should produce goods for which they have the greatest relative advantage is the _______.", "Theory of comparative advantage", ["Comparative advantage"]),
    gap("The theory that countries export products using abundant production factors and import products requiring scarce factors is the _______.", "Factor endowment theory", ["Factor endowments theory"]),
    gap("Government financial assistance to domestic producers, such as cash payments, tax breaks or price support, is a _______.", "Subsidy"),
    gap("A government promise to repay a company's loan if the company defaults is a _______.", "Loan guarantee"),
    gap("A designated area where goods pass with lower duties or fewer customs procedures is a _______.", "Foreign trade zone", ["FTZ"]),
    gap("The theory explaining how production moves abroad as a new product matures and becomes standardized is the _______.", "International product life cycle theory", ["IPLC", "IPLC theory", "International product life cycle"]),
    gap("A complete official ban on trade in specified products or with a particular country is an _______.", "Embargo"),
    gap("The only international organization administering global rules of trade between nations is the _______.", "World Trade Organization", ["WTO"]),
    gap("The modern policy of promoting exports and restraining imports to pursue national economic objectives is _______.", "Neo-mercantilism"),
    gap("The treaty designed to reduce tariff and non-tariff barriers before the WTO was the _______.", "General Agreement on Tariffs and Trade", ["GATT"]),
    gap("The trade theory linking specialization to the relative abundance and cost of labour and capital is the _______.", "Heckscher–Ohlin theory", ["Heckscher Ohlin theory"]),
    gap("The unexpected finding that US exports appeared more labour-intensive than its imports is the _______.", "Leontief paradox"),
    gap("Visible trade in Britain, or merchandise trade in the United States, is trade in _______.", "Commodities", ["Goods"]),
    gap("Foodstuffs, fuels and industrial raw materials are examples of _______ commodities.", "Primary"),
    gap("The ratio of the unit price of exports to the unit price of imports is called the _______.", "Terms of trade", ["TOT"]),
    gap("A government tax levied on a product as it enters or leaves a country is a _______.", "Tariff"),
    gap("A tariff levied by the country from which a product is sent abroad is an _______.", "Export tariff"),
    gap("A tariff levied by the country into which a product is brought is an _______.", "Import tariff"),
    gap("A tariff calculated as a percentage of an imported product's stated value is an _______ tariff.", "Ad valorem", ["Ad valorem tariff", "Ad valorem duty"]),
    gap("A tariff charged as a fixed fee for each physical unit of an imported product is a _______.", "Specific tariff", ["Specific duty"]),
    gap("A tariff combining a percentage of value with a fixed fee per unit is a _______.", "Compound tariff", ["Compound duty"]),
    gap("The international body that administers agreements and settles disputes over trade rules is the _______.", "World Trade Organization", ["WTO"]),
    gap("Selling a product abroad below its normal home-market price or cost is called _______.", "Dumping")
  ],
  "unit-3": [
    gap("A situation in which every country can benefit from trade, even if some benefit more than others, is a _______.", "Positive-sum game", ["Positive sum game"]),
    gap("The gradual or complete removal of existing impediments to trade in goods and services is called _______.", "Trade liberalization", ["Trade liberalisation"]),
    gap("The BOP component showing trade in goods and services, income and current transfers is the _______.", "Current account"),
    gap("The theory that firm or industry success rests on cost advantages or differentiated products concerns _______.", "Competitive advantage"),
    gap("The increasing integration of national economies through trade, investment and capital flows is _______.", "Globalization", ["Globalisation"]),
    gap("The economic philosophy advocating simultaneous export promotion and import restriction is _______.", "Mercantilism"),
    gap("A non-binding intergovernmental instrument regulating specified government or corporate behaviour is a _______.", "Code of conduct"),
    gap("The extension of economic activity across national borders to use lower costs and production specialization is _______.", "Internationalization", ["Internationalisation"]),
    gap("The claim that new industries need temporary protection until they can compete internationally is the _______.", "Infant industry argument"),
    gap("An agreement between two countries setting the conditions under which they trade is a _______.", "Bilateral trade agreement"),
    gap("Moving away from a system of distinct national markets is called the _______.", "Globalization of markets", ["Globalisation of markets"]),
    gap("Government financial assistance provided to a domestic producer is a _______.", "Subsidy"),
    gap("The difference or relationship between an economy's exports and imports is its _______.", "Balance of trade"),
    gap("A jurisdiction with exceptionally low or zero income taxes is a _______.", "Tax haven"),
    gap("Laws designed to protect domestic producers from unfairly low-priced imports are _______.", "Anti-dumping laws", ["Antidumping laws"]),
    gap("An intergovernmental agreement creating non-discriminatory, predictable and transparent trade rights and obligations is a _______.", "Multilateral trade agreement"),
    gap("A policy climate that shields domestic producers from the rigours of international markets is _______.", "Protectionism"),
    gap("Government acts, policies and practices that influence trade in goods and services form _______.", "Commercial policy"),
    gap("FDI in the same industry abroad as the investing firm operates in at home is _______.", "Horizontal FDI", ["Horizontal foreign direct investment"]),
    gap("A group of countries that pursues a common external trade policy is a _______.", "Common market"),
    gap("An economic system combining private ownership and markets with significant government ownership or planning is a _______.", "Mixed economy"),
    gap("The output level at which most plant-level economies of scale are exhausted is the _______.", "Minimum efficient scale", ["MES"]),
    gap("The absence of artificial barriers to the flow of goods and services between countries is _______.", "Free trade"),
    gap("The BOP account recording cross-border transactions in financial assets, investments and loans is the _______.", "Capital account"),
    gap("A measure of how strongly demand responds to a change in price is _______.", "Price elasticity of demand", ["PED"]),
    gap("The full framework of laws, agreements and negotiating positions used to secure market access is _______.", "Trade policy"),
    gap("An MNE policy under which host-country nationals manage local subsidiaries is _______.", "Polycentric staffing"),
    gap("A rule requiring a stated fraction of a product to be produced domestically is a _______.", "Local content requirement"),
    gap("The statistical record of a country's total trade, economic transactions and financial flows is the _______.", "Balance of payments", ["BOP", "Balance of payment"]),
    gap("Government approaches to promoting and protecting rivalry in markets form _______.", "Competition policy"),
    gap("Trade cooperation based on equal rights, obligations and non-discrimination among many countries is _______.", "Multilateralism"),
    gap("An export quota imposed by the exporting country, usually at the importer's request, is a _______.", "Voluntary export restraint", ["VER", "Voluntary export restraint (VER)"]),
    gap("The free cross-border movement of goods, services, capital and people is _______.", "Free trade"),
    gap("An exchange-rate system in which supply and demand continuously adjust a currency's price is a _______.", "Floating exchange rate", ["Floating exchange-rate system"]),
    gap("The international treaty that committed signatories to lower trade barriers and later led to the WTO was _______.", "General Agreement on Tariffs and Trade", ["GATT"])
  ],
  "unit-4": [
    gap("Establishing or acquiring a direct business interest in another country is _______.", "Foreign direct investment", ["FDI"]),
    gap("Purchasing foreign shares or bonds without seeking managerial control is _______.", "Foreign portfolio investment", ["FPI", "Portfolio investment"]),
    gap("Cash grants, tax credits, accelerated depreciation and low-interest loans offered to attract FDI are _______.", "Investment incentives"),
    gap("Payments made by a foreign manufacturer for the right to use licensed property are _______.", "Royalty payments", ["Royalties"]),
    gap("An independent sales agent granted the sole contractual right to sell a foreign manufacturer's products is an _______.", "Exclusive distributor"),
    gap("A separate subsidiary jointly owned by two or more independent companies is a _______.", "Joint venture", ["JV"]),
    gap("A sales agent that represents more than one manufacturer is a _______.", "Multiple distributor"),
    gap("A system giving foreign subsidiaries a significant voice in crucial decisions is _______.", "Decentralization", ["Decentralisation"]),
    gap("A system in which the parent retains decision-making power and tight control over subsidiaries is _______.", "Centralization", ["Centralisation"]),
    gap("When one company takes control of another and becomes its new owner, the purchase is an _______.", "Acquisition"),
    gap("Building a new foreign subsidiary from the ground up is a _______.", "Greenfield investment", ["Greenfield project"]),
    gap("When two firms combine and continue as one company, the transaction is a _______.", "Merger"),
    gap("The purchase of enough shares to gain a controlling interest in a target firm is a _______.", "Buyout"),
    gap("Buying as many of a target company's shares as possible on the stock market is a _______.", "Raid"),
    gap("A public offer to shareholders to buy their shares at a stated price within a limited period is a _______.", "Takeover bid"),
    gap("A combination between competitors making the same or similar products is a _______.", "Horizontal merger"),
    gap("A combination between companies at connected stages of production or distribution is a _______.", "Vertical merger"),
    gap("A corporation controlling production and marketing in several countries is a _______.", "Multinational corporation", ["MNC", "Multinational enterprise", "MNE"])
  ],
  "unit-9": [
    gap("A contract in which an insurer compensates an insured for covered financial loss in return for a premium is _______.", "Insurance"),
    gap("The standard-form contract stating which claims an insurer must legally pay is an _______.", "Insurance policy"),
    gap("The party that undertakes to indemnify covered losses is the _______.", "Insurer", ["Underwriter", "Insurer or underwriter"]),
    gap("The person or entity buying insurance and receiving indemnity is the _______.", "Insured", ["Policyholder", "Insured or policyholder"]),
    gap("The person, group, property or legal interest for which a policy is issued is the _______.", "Subject-matter insured", ["Subject matter insured"]),
    gap("The payment made to buy an insurance policy and keep it in force is the _______.", "Premium"),
    gap("Spreading losses incurred by a few members across the whole insured group is _______.", "Pooling", ["Pooling of losses"]),
    gap("An accidental, unforeseen and unexpected loss occurring by chance is a _______.", "Fortuitous loss"),
    gap("Moving a pure risk from the insured to the insurer is called _______.", "Risk transfer"),
    gap("Restoring an insured approximately to the financial position held before a covered loss is _______.", "Indemnification", ["Indemnity"]),
    gap("The rule that an insured should receive no more than the actual loss is the principle of _______.", "Indemnity", ["Principle of indemnity"]),
    gap("The requirement that the insured would suffer financially if the covered event occurred is _______.", "Insurable interest", ["Principle of insurable interest"]),
    gap("The insurer's right, after paying a claim, to recover from a negligent third party is _______.", "Subrogation", ["Principle of subrogation"]),
    gap("The unusually high standard of honesty imposed on both parties to an insurance contract is _______.", "Utmost good faith", ["Principle of utmost good faith"]),
    gap("Statements made by an applicant for insurance are called _______.", "Representations", ["Representation"]),
    gap("Intentional failure to reveal a material fact to an insurer is _______.", "Concealment", ["Nondisclosure", "Non-disclosure"]),
    gap("A statement that forms part of an insurance contract and is guaranteed to be true is a _______.", "Warranty"),
    gap("Cover for ships, cargo, terminals and related transport between origin and destination is _______.", "Marine insurance"),
    gap("Cover for the hull and cargo of ocean-going vessels against insured marine perils is _______.", "Ocean marine insurance"),
    gap("Damage or expense affecting only a particular interest, without a voluntary sacrifice for common safety, is _______.", "Particular average"),
    gap("An extraordinary sacrifice or expense intentionally incurred for the common safety of ship and cargo is _______.", "General average"),
    gap("A marine policy effective for a specified period, commonly 12 months, is a _______.", "Time policy"),
    gap("A policy covering the subject matter from one port or place to another is a _______.", "Voyage policy"),
    gap("A policy used for consignments shipped regularly and frequently to overseas markets is an _______.", "Open policy", ["Open cover"])
  ]
};

window.ESP3_DATA.units.forEach(unit => {
  const generated = unit.terms.map(([term, definition]) =>
    gap(`_______: ${definition}`, term)
  );
  unit.gaps = ESP3_SOURCE_GAPS[unit.id] || generated;
});
