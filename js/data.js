const WARDS = ['Vườn Lài', 'Hòa Hưng', 'Diên Hồng', 'Minh Phụng', 'Bình Thới', 'Phú Thọ', 'Hòa Bình', 'Tân Phú'];
const PAL = ['#0E2A5C', '#1A73D9', '#3FD1A6', '#F0A030', '#E04B4B', '#8A5CE0', '#22C0EE', '#E05A8A', '#7A5C3C', '#2E8B57', '#9AA5B1', '#5AA0FE', '#C2185B', '#00897B'];
const C1 = '#3D6FE0', C2 = '#0E2A5C', C3 = '#22A6F0';
const KY = n => Array.from({ length: n }, (_, i) => 'Kỳ ' + (i + 1));
const NUM = n => Array.from({ length: n }, (_, i) => String(i + 1));
const DOT = n => Array.from({ length: n }, (_, i) => 'Đợt ' + (i + 1));

const OVERVIEW = {
  pills: [
    { name: 'Doanh thu', unit: 'Đơn vị: Tỷ VNĐ', fmt: 'ty1', y25: [33.3, 30.9, 29.6, 34.3, 32.1, 33.2, 31.1, 32.6, 31.9, 33.8, 32.4, 34.6], y26: [32.8, 31.6, 28.4, 34.0, 32.4, 33.5, 32.0, 33.1, 33.4], s25: '384,7 tỷ', s26: '289,4 tỷ' },
    { name: 'Giá bán bình quân', unit: 'Đơn vị: Nghìn VNĐ', fmt: 'k1', y25: [12.1, 11.7, 11.8, 12.2, 12, 12.1, 12, 12.1, 12.0, 12.1, 12.2, 12.1], y26: [12.1, 11.8, 11.7, 12.3, 12.1, 12.2, 12.1, 12.2, 12.2], s25: '12.1 nghìn', s26: '12.2 nghìn' },
    { name: 'Sản lượng', unit: 'Đơn vị: Triệu m³', fmt: 'tr1', y25: [2.7, 2.6, 2.5, 2.8, 2.7, 2.7, 2.6, 2.7, 2.6, 2.8, 2.7, 2.8], y26: [2.6, 2.6, 2.4, 2.8, 2.7, 2.7, 2.6, 2.7, 2.6], s25: '32,0 triệu', s26: '23,7 triệu' }
  ],
  kpis: [
    { id: 'kpi-kh', tab: 'kh', color: '#D2AC6C', icon: 'users', title: 'Khách hàng', total: '90.475', note: 'Số lượng khách hàng' },
    { id: 'kpi-sl', tab: 'sl', color: '#00C0DA', icon: 'drop', title: 'Sản lượng', total: '23.747.580', note: 'Tổng sản lượng 2026 (m3)' },
    { id: 'kpi-dt', tab: 'dt', color: '#00AD26', icon: 'money', title: 'Doanh thu', total: '289.375.844.470', note: 'Tổng doanh thu 2026 (VNĐ)' },
    { id: 'kpi-ttt', tab: 'dt', color: '#007257', icon: 'gauge', title: 'Tỷ lệ thực thu', total: '95,47%', note: 'Tỷ lệ thực thu 2026' },
    { id: 'kpi-tt', tab: 'tt', color: '#E02020', icon: 'leak', title: 'Thất thoát nước', total: '6,12', note: 'Tỷ lệ thất thoát nước (%)' },
    { id: 'kpi-gbbq', tab: 'gbbq', color: '#11B482', icon: 'tag', title: 'Giá bán bình quân', total: '12.185', note: 'Giá bán bình quân' },
    { id: 'kpi-thuho', tab: 'thuho', color: '#1A7FC1', icon: 'wallet', title: 'Thu hộ tiền nước', total: '276.268.134.480', note: 'Tổng thu hộ 2026' },
    { id: 'kpi-dd', tab: 'dd', color: '#6A5ACD', icon: 'id', title: 'Định danh CCCD', total: '426.043', note: 'Số lượng định danh CCCD' },
    { id: 'kpi-ganmoi', tab: 'ganmoi', color: '#F39200', icon: 'plus', title: 'Gắn mới ĐHN', total: '68', note: 'Số lượng gắn mới ĐHN' },
    { id: 'kpi-doi', tab: 'doi', color: '#D86FF3', icon: 'move', title: 'Dời ĐHN', total: '768', note: 'Số lượng dời ĐHN' },
    { id: 'kpi-thaynho', tab: 'thay', seg: 0, color: '#0171CC', icon: 'swap', title: 'Thay ĐHN cỡ nhỏ', total: '12.351', note: 'Số lượng thay ĐHN cỡ nhỏ' },
    { id: 'kpi-thaylon', tab: 'thay', seg: 1, color: '#054D8E', icon: 'swap', title: 'Thay ĐHN cỡ lớn', total: '32', note: 'Số lượng thay ĐHN cỡ lớn' },
    { id: 'kpi-dvkh', tab: 'dvkh', color: '#AC943A', icon: 'folder', title: 'Hồ sơ DVKH', total: '12.637', note: 'Số lượng hồ sơ DVKH' },
    { id: 'kpi-ktks', tab: 'ktks', color: '#5AA0FE', icon: 'folder', title: 'Hồ sơ KTKS', total: '28.173', note: 'Số lượng hồ sơ KTKS' },
    { id: 'kpi-hoadon', tab: 'hoadon', color: '#2E8B57', icon: 'doc', title: 'Hóa đơn', rows: [['0m³', '44.168'], ['1->4m³', '60.149']] },
    { id: 'kpi-sawaco', tab: 'sawaco', color: '#006978', icon: 'phone', title: 'KH tải app Sawaco', total: '17.552', note: 'Tổng KH: 90.475' },
    { id: 'kpi-hcsb', tab: 'tt', target: 'tt-be', color: '#8B4513', icon: 'tool', title: 'Hoàn công sửa bể', total: '3.095', note: 'Tổng báo bể: 668' }
  ]
};

const CT = ['Chuẩn thu 1 (không TT)', 'Chuẩn thu 2 (có TT)'];

const TABS = [
  {
    key: 'kh', name: 'Khách hàng',
    purpose: 'Thống kê và phân tích cơ cấu khách hàng theo đơn vị hành chính/phòng quản lý, theo kích cỡ đồng hồ nước (ĐHN) và theo các nhóm giá biểu dịch vụ.',
    steps: [
      ['Tại màn hình Báo cáo tổng quan, chạm thẻ <b>Khách hàng</b> để mở tab Khách hàng.', 'screen:overview;target:kpi-kh'],
      ['Xem khung <b>Khách hàng theo phường</b>: số khách hàng từng phường, chia theo QLGT 1 và QLGT 2, kèm tổng và tỷ lệ % mỗi nhóm.', 'tab:kh;target:kh-phuong'],
      ['Ở thẻ <b>Khách hàng theo cỡ ĐHN</b>, chạm một lát donut hoặc mục chú thích để xem số lượng và tỷ lệ của cỡ đó.', 'tab:kh;target:kh-cdhn'],
      ['Chạm nút phễu để lọc theo Năm, Kỳ, Phường rồi bấm <b>Áp dụng</b>.', 'tab:kh;target:kh-cdhn;open:filter'],
      ['Ở thẻ <b>Khách hàng theo giá biểu</b>, chạm một ô trên bản đồ nhiệt để xem số khách hàng của phường và giá biểu đó.', 'tab:kh;target:kh-gb'],
      ['Chuyển sang <b>Bảng</b> để xem số liệu chi tiết theo kỳ kèm cột chênh lệch +/-.', 'tab:kh;target:kh-gb;view:table']
    ],
    notes: ['Xóa filter ở tab Khách hàng đưa toàn bộ điều kiện về mặc định.'],
    blocks: [
      { t: 'qlgt', id: 'kh-phuong', title: 'KHÁCH HÀNG THEO PHƯỜNG', total: '90.475 KH', d: 'Tổng hợp số khách hàng theo phường, chia 2 nhóm QLGT 1 và QLGT 2; thanh tiến độ thể hiện tỷ trọng của nhóm.', groups: [
        { name: 'QLGT 1', items: [['Vườn Lài', 16451], ['Hòa Hưng', 14876], ['Diên Hồng', 11497]], total: 42824, pct: '47,3%' },
        { name: 'QLGT 2', items: [['Minh Phụng', 13411], ['Bình Thới', 10805], ['Phú Thọ', 8623], ['Hòa Bình', 8227], ['Tân Phú', 6585]], total: 47651, pct: '52,7%' }
      ] },
      { t: 'card', id: 'kh-cdhn', title: 'Khách hàng theo cỡ ĐHN', filters: ['nam', 'ky', 'phuong'], reset: 'all', d: 'Biểu đồ donut cơ cấu khách hàng theo đường kính ĐHN. Bộ lọc: Năm, Kỳ, Phường.',
        chart: { type: 'donut', center: 'Tổng', items: [['15mm', 84210], ['25mm', 3120], ['40mm', 1452], ['50mm', 986], ['80mm', 412], ['100mm', 295]] } },
      { t: 'card', id: 'kh-gb', title: 'Khách hàng theo giá biểu', filters: ['nam', 'ky', 'phuong'], reset: 'all', d: 'Bản đồ nhiệt Phường × Giá biểu. Màu càng đậm càng nhiều khách hàng; ô bằng 0 màu xám.',
        chart: { type: 'heat', cols: ['10', '11', '15', '21', '25', '31', '33', '35'], rows: [
          ['Bình Thới', [14, 5649, 5009, 3, 0, 76, 17, 8]], ['Diên Hồng', [0, 5112, 6186, 15, 1, 89, 28, 4]], ['Hòa Bình', [6, 4310, 3720, 3, 0, 40, 5, 2]],
          ['Hòa Hưng', [1, 6823, 7810, 19, 0, 101, 22, 6]], ['Minh Phụng', [1, 6604, 6566, 6, 1, 88, 21, 9]], ['Phú Thọ', [1, 4510, 4022, 2, 0, 49, 21, 3]],
          ['Tân Phú', [0, 3108, 3365, 1, 2, 26, 4, 1]], ['Vườn Lài', [2, 8812, 7405, 6, 3, 130, 18, 7]]
        ] } }
    ]
  },
  {
    key: 'sl', name: 'Sản lượng',
    purpose: 'Theo dõi chi tiết sản lượng tiêu thụ nước theo m³, phân tích đa chiều theo Năm, Kỳ hóa đơn, Đợt đọc số, Ngày, Giá biểu, Cỡ ĐHN và bảng xếp hạng năng suất nhân viên đọc số.',
    steps: [
      ['Chạm thẻ <b>Sản lượng</b> ở màn hình tổng quan, hoặc chạm tab Sản lượng trên thanh tab.', 'tab:sl;target:sl-banner'],
      ['Đọc khung tóm tắt: Tổng sản lượng năm, Kế hoạch và Tỷ lệ đạt.', 'tab:sl;target:sl-banner'],
      ['Chọn <b>Chuẩn thu 1 (không TT)</b> hoặc <b>Chuẩn thu 2 (có TT)</b> để đổi cách tính.', 'tab:sl;target:sl-ct'],
      ['Mở khung <b>Tổng hợp theo năm</b> để so sánh sản lượng 2025 – 2026 theo kỳ, giá biểu và cỡ ĐHN.', 'tab:sl;target:sl-nam'],
      ['Ở khung <b>Chi tiết sản lượng</b>, bấm phễu để chọn Năm, Kỳ, Đợt, Phường. Bộ lọc áp dụng cho cả 4 thẻ trong khung.', 'tab:sl;target:sl-ct-g;open:filter'],
      ['Ở khung <b>Sản lượng theo nhân viên</b>, gõ tên vào ô tìm kiếm để lọc nhanh nhân viên đọc số.', 'tab:sl;target:sl-nv']
    ],
    notes: ['Ô Đợt (1–6) chỉ có ở tab Sản lượng.', 'Xóa filter ở khung Chi tiết sản lượng đưa hết về mặc định.'],
    blocks: [
      { t: 'banner', id: 'sl-banner', bg: '#2F6FD6', tl: 'Tổng sản lượng 2026 (m³)', tv: '25.468.397', rl: 'Tỷ lệ đạt', rv: '78.85%', bl: 'Kế hoạch (m³)', br: '32.300.000', prog: 78.85, pc: '#F0A030', d: 'Khung tóm tắt sản lượng năm so với kế hoạch.' },
      { t: 'seg', id: 'sl-ct', options: CT, d: 'Công tắc chuẩn thu áp dụng cho số liệu toàn tab.' },
      { t: 'group', id: 'sl-nam', title: 'Tổng hợp theo năm', sub: 'So sánh sản lượng các kỳ', d: 'Nhóm 3 thẻ so sánh 2025 – 2026, không có bộ lọc.', children: [
        { t: 'card', id: 'sl-nam-ky', title: 'Tổng hợp theo năm', sub: '2025 vs 2026 (m³)', chart: { type: 'bar', fmt: 'm3', cats: NUM(12), series: [
          { name: 'Năm 2025 (m³)', color: C1, data: [2.71e6, 2.6e6, 2.5e6, 2.8e6, 2.7e6, 2.72e6, 2.6e6, 2.7e6, 2.65e6, 2.78e6, 2.7e6, 2.81e6] },
          { name: 'Năm 2026 (m³)', color: C2, data: [2.66e6, 2.58e6, 2.42e6, 2.84e6, 2.73e6, 2.75e6, 2.61e6, 2.71e6, 2.62e6, 0, 0, 0] }] } },
        { t: 'card', id: 'sl-nam-gb', title: 'Sản lượng theo giá biểu', sub: '2025 vs 2026 (m³)', chart: { type: 'bar', fmt: 'm3', label: 0, cats: ['10', '11', '15', '21', '25', '31', '33', '35'], series: [
          { name: 'Năm 2025 (m³)', color: C1, data: [5200, 10.1e6, 16e6, 50800, 10500, 2.4e6, 270000, 211400] },
          { name: 'Năm 2026 (m³)', color: C2, data: [4100, 7.6e6, 12.6e6, 41000, 8300, 1.8e6, 269600, 160300] }] } },
        { t: 'card', id: 'sl-nam-co', title: 'Sản lượng theo cỡ đồng hồ nước', sub: '2025 vs 2026 (m³)', chart: { type: 'bar', fmt: 'm3', label: 0, cats: ['15', '25', '40', '50', '100'], series: [
          { name: 'Năm 2025 (m³)', color: C1, data: [26.1e6, 1.2e6, 170400, 2.8e6, 1.7e6] },
          { name: 'Năm 2026 (m³)', color: C2, data: [19.7e6, 0.9e6, 131000, 2.1e6, 1.3e6] }] } }
      ] },
      { t: 'group', id: 'sl-ct-g', title: 'Chi tiết sản lượng', filters: ['nam', 'ky', 'dot', 'phuong'], reset: 'all', d: 'Nhóm 4 thẻ dùng chung một bộ lọc Năm – Kỳ – Đợt – Phường.', children: [
        { t: 'card', id: 'sl-dot', title: 'Sản lượng theo đợt', sub: '10/2025 - 9/2026 - 10/2026 (m³)', chart: { type: 'bar', fmt: 'm3', cats: NUM(8), series: [
          { name: '10/2025 (m³)', color: C1, data: [196100, 215000, 179300, 242300, 245000, 202200, 245500, 183100] },
          { name: '9/2026 (m³)', color: C3, data: [207000, 221500, 191900, 237400, 239800, 190300, 238100, 188000] },
          { name: '10/2026 (m³)', color: C2, data: [199000, 210300, 185000, 240100, 244000, 196000, 252000, 186500] }] } },
        { t: 'card', id: 'sl-ngay', title: 'Sản lượng theo ngày', sub: '10/2025 - 9/2026 - 10/2026 (m³)', chart: { type: 'bar', fmt: 'm3', cats: NUM(8), series: [
          { name: '10/2025 (m³)', color: C1, data: [6900, 7200, 6000, 7900, 8000, 6300, 7900, 6300] },
          { name: '9/2026 (m³)', color: C3, data: [7000, 7300, 6100, 7800, 7900, 6200, 7800, 6200] },
          { name: '10/2026 (m³)', color: C2, data: [7100, 7100, 5900, 8000, 8100, 6400, 8000, 6400] }] } },
        { t: 'card', id: 'sl-gbct', title: 'Sản lượng theo giá biểu (chi tiết)', sub: 'Kỳ 10 - Năm 2026 (m³)', chart: { type: 'bar', fmt: 'm3', cats: ['10', '11', '15', '21', '25', '31', '33', '35'], series: [
          { name: 'Kỳ 10/2026 (m³)', color: C2, data: [268, 571900, 868300, 6700, 341, 128000, 16100, 7300] }] } },
        { t: 'card', id: 'sl-coct', title: 'Sản lượng theo cỡ ĐHN (chi tiết)', sub: 'Kỳ 10 - Năm 2026 (m³)', chart: { type: 'bar', fmt: 'm3', cats: ['15mm', '25mm', '40mm', '50mm', '100mm'], series: [
          { name: 'Kỳ 10/2026 (m³)', color: C2, data: [1.4e6, 57100, 3200, 110800, 106900] }] } }
      ] },
      { t: 'group', id: 'sl-nv', title: 'Sản lượng theo nhân viên', filters: ['nam', 'ky', 'phuong'], reset: 'all', d: 'Xếp hạng nhân viên đọc số theo sản lượng; có ô tìm kiếm, kèm chênh lệch so với kỳ trước.', children: [
        { t: 'card', id: 'sl-nv-rank', title: '', bare: true, chart: { type: 'rank', search: 'Tìm nhân viên...', color: '#3D6FE0', items: [
          { n: 'Nguyễn Vũ - Máy 12', v: '15.338 • 0', p: 100, d: '- 15.338' }, { n: 'Tấn Phát - Máy 14', v: '49.299 • 0', p: 96, d: '- 49.299' },
          { n: 'Anh Minh - Máy 10', v: '44.749 • 0', p: 90, d: '- 44.749' }, { n: 'Quang Huy - Máy 20', v: '44.122 • 0', p: 88, d: '- 44.122' },
          { n: 'B Quốc Tuấn - Máy 17', v: '26.215 • 0', p: 70, d: '- 26.215' }, { n: 'Tấn Lộc - Máy 1', v: '25.888 • 0', p: 68, d: '- 25.888' },
          { n: 'Hoàng Thắng - Máy 11', v: '24.057 • 0', p: 64, d: '- 24.057' }, { n: 'Trần A Minh - Máy 6', v: '22.908 • 0', p: 61, d: '- 22.908' },
          { n: 'Quốc Phúc - Máy 4', v: '22.137 • 0', p: 59, d: '- 22.137' }, { n: 'Văn Quí - Máy 16', v: '19.626 • 0', p: 52, d: '- 19.626' },
          { n: 'Thọ Lương - Máy 28', v: '13.428 • 12.286', p: 40, d: '- 1.142' }, { n: 'Minh Hoàng - Máy 30', v: '12.766 • 8.976', p: 36, d: '- 3.790' }
        ] } }
      ] }
    ]
  },
  {
    key: 'dt', name: 'Doanh thu',
    purpose: 'Đánh giá tình hình thực hiện kế hoạch doanh thu tiền nước, so sánh đối chiếu chuỗi số liệu phát sinh giữa các kỳ hóa đơn và các đợt thu.',
    steps: [
      ['Mở tab <b>Doanh thu</b>. Khung xanh lá cho biết Tổng doanh thu năm, Kế hoạch và Tỷ lệ thực hiện.', 'tab:dt;target:dt-banner'],
      ['Chọn chuẩn thu 1 hoặc 2 để đổi cách tính.', 'tab:dt;target:dt-ct'],
      ['Thẻ <b>Doanh thu theo kỳ</b>: chạm một cột để xem số đầy đủ của 2 năm tại kỳ đó.', 'tab:dt;target:dt-ky;tip:3'],
      ['Thẻ <b>Doanh thu theo đợt</b>: bấm phễu, đổi Năm/Kỳ rồi Áp dụng. Đổi Năm ở thẻ này sẽ tải lại toàn bộ tab Doanh thu.', 'tab:dt;target:dt-dot;open:filter']
    ],
    notes: ['Thẻ Doanh thu theo kỳ tự ẩn khi không có dữ liệu.', 'Số trên đầu cột rút gọn theo đơn vị tỷ.'],
    blocks: [
      { t: 'banner', id: 'dt-banner', bg: '#16A34A', tl: 'Tổng doanh thu 2026 (VNĐ)', tv: '304.589.933.300', rl: 'Tỷ lệ thực hiện', rv: '78.05%', bl: 'Kế hoạch 2026 (VNĐ)', br: '390.249.000.000', prog: 78.05, pc: '#F0A030', d: 'Tóm tắt doanh thu năm so với kế hoạch.' },
      { t: 'seg', id: 'dt-ct', options: CT, d: 'Công tắc chuẩn thu.' },
      { t: 'card', id: 'dt-ky', title: 'Doanh thu theo kỳ', sub: '2025 vs 2026 (tỷ)', d: 'So sánh doanh thu từng kỳ giữa 2 năm. Không có bộ lọc.', chart: { type: 'bar', fmt: 'ty', label: 0, cats: KY(12), series: [
        { name: 'Năm 2025', color: C1, data: [33.4e9, 30.9e9, 29.6e9, 34.3e9, 32.1e9, 33.2e9, 31.1e9, 32.7e9, 31.9e9, 33.8e9, 32.4e9, 34.6e9] },
        { name: 'Năm 2026', color: C2, data: [32.8e9, 31.6e9, 28.4e9, 34.0e9, 32.4e9, 33.5e9, 32.0e9, 33.1e9, 33.4e9, 0, 0, 0] }] } },
      { t: 'card', id: 'dt-dot', title: 'Doanh thu theo đợt', filters: ['nam', 'ky'], reset: 'all', reloadTab: true, d: 'Doanh thu theo từng đợt của kỳ đang chọn, so sánh 3 mốc. Đổi Năm sẽ tải lại cả tab.', chart: { type: 'bar', fmt: 'ty', cats: DOT(8), series: [
        { name: '10/2025', color: C1, data: [2.3e9, 2.7e9, 2.3e9, 2.7e9, 3.1e9, 2.2e9, 2.9e9, 2.4e9] },
        { name: '9/2026', color: C3, data: [2.4e9, 2.6e9, 2.2e9, 2.8e9, 3.0e9, 2.3e9, 2.8e9, 2.5e9] },
        { name: '10/2026', color: C2, data: [2.2e9, 2.8e9, 2.4e9, 2.6e9, 3.2e9, 2.1e9, 3.0e9, 2.3e9] }] } }
    ]
  },
  {
    key: 'tt', name: 'Thất thoát nước',
    purpose: 'Giám sát chỉ số tỷ lệ thất thoát nước (TTN) toàn hệ thống, theo các tuyến đồng hồ tổng (ĐHT) mua bán sỉ, theo khu vực quản lý DMA và số lượng điểm bể sự cố đã khắc phục.',
    steps: [
      ['Mở tab <b>Thất thoát nước</b>. Khung đỏ: Tỷ lệ thất thoát hiện tại, % Đạt kế hoạch và Mức kế hoạch tối đa.', 'tab:tt;target:tt-banner'],
      ['Thẻ <b>Tỷ lệ thất thoát so sánh 2 năm</b>: chạm cột để xem % từng năm.', 'tab:tt;target:tt-2nam'],
      ['Thẻ <b>Chi tiết sản lượng & lượng nước thất thoát theo kỳ</b>: chạm một kỳ để xem tooltip chung; chạm mục chú thích để ẩn/hiện từng dãy.', 'tab:tt;target:tt-combo;tip:2'],
      ['Mở khung <b>TTN theo ĐHT mua bán sỉ</b>, chọn Chuẩn thu 1/2, lọc kỳ để xem các ô chỉ số và biểu đồ so sánh 2 năm.', 'tab:tt;target:tt-dht'],
      ['Mở khung <b>TTTN theo ĐHT DMA</b> để xem tỷ lệ Vùng 1, Vùng 2 và Tổng vùng.', 'tab:tt;target:tt-dma'],
      ['Mở khung <b>Số điểm bể đã sửa</b>: số điểm bể ngầm/nổi theo kỳ và thống kê nguyên nhân bể (donut).', 'tab:tt;target:tt-be']
    ],
    notes: ['Thẻ Tỷ lệ thất thoát so sánh 2 năm tự ẩn khi không có dữ liệu.', 'Dãy bị ẩn trên biểu đồ kết hợp có gạch ngang và không xuất hiện trong tooltip.'],
    blocks: [
      { t: 'banner', id: 'tt-banner', bg: '#D64545', tl: 'Tỷ lệ thất thoát nước', tv: '6.13%', rl: 'Đạt kế hoạch', rv: '123.38%', bl: 'Mức kế hoạch tối đa', br: '8%', prog: 100, pc: '#4CAF50', d: 'Tỷ lệ thất thoát hiện tại so với mức kế hoạch tối đa.' },
      { t: 'card', id: 'tt-2nam', title: 'Tỷ lệ thất thoát so sánh 2 năm', sub: 'So sánh 2026 vs 2025 — đơn vị %', d: 'So sánh tỷ lệ thất thoát từng kỳ giữa 2 năm.', chart: { type: 'bar', fmt: 'pct', label: 1, cats: KY(12), series: [
        { name: '2025 (%)', color: C2, data: [1.56, 6.8, 6.4, 6.2, 6.5, 6.6, 6.5, 6.4, 6.3, 6.2, 6.1, 6.0] },
        { name: '2026 (%)', color: '#1F86E0', data: [7.9, 7.31, 6.88, 6.61, 6.72, 6.70, 6.71, 6.73, 6.5, 0, 0, 0] }] } },
      { t: 'card', id: 'tt-combo', title: 'Chi tiết sản lượng & lượng nước thất thoát theo kỳ', filters: ['nam'], d: 'Biểu đồ kết hợp cột (tỷ lệ) và đường (lượng thất thoát). Lọc theo năm.', chart: { type: 'combo', cats: KY(8),
        bars: [{ name: 'Tỷ lệ thất thoát', color: '#E04B4B', data: [7.9, 7.3, 6.9, 6.6, 6.7, 6.7, 6.7, 6.7], fmt: 'pct' }, { name: 'Tỷ lệ TT ngày', color: '#139C8C', data: [7.2, 3.1, 6.7, 6.5, 6.6, 6.5, 6.6, 6.6], fmt: 'pct' }],
        lines: [{ name: 'Lượng thất thoát', color: '#F0A030', data: [190000, 230000, 285000, 330000, 380000, 420000, 460000, 500000], fmt: 'm3' }, { name: 'Lượng thất thoát ngày', color: '#8A3FD1', data: [6300, 2500, 6400, 6500, 6450, 6500, 6480, 6520], fmt: 'm3' }] } },
      { t: 'group', id: 'tt-dht', title: 'TTN theo ĐHT mua bán sỉ', d: 'Tỷ lệ thất thoát theo đồng hồ tổng mua bán sỉ.', children: [
        { t: 'seg', id: 'tt-dht-ct', options: CT },
        { t: 'tiles', id: 'tt-dht-k', title: 'Báo cáo kỳ 8', filters: ['nam', 'ky'], items: [
          { l: 'TTN KỲ 8', v: '6.70%', tone: 'red' }, { l: 'TTN KỲ 8 THEO NGÀY', v: '6.64%', tone: 'orange' },
          { l: 'TTN LŨY KẾ', v: '6.48%', tone: 'red' }, { l: 'TTN LŨY KẾ THEO NGÀY', v: '6.34%', tone: 'orange' },
          { l: 'TỶ LỆ THỰC HIỆN', v: '123.46%', tone: 'blue', wide: true }] },
        { t: 'card', id: 'tt-dht-2n', title: 'So sánh 2 năm — Chuẩn thu 1 (không truy thu)', sub: 'So sánh 2026 vs 2025 — đơn vị %', filters: ['nam'], chart: { type: 'bar', fmt: 'pct', cats: KY(8), series: [
          { name: '2026 (%)', color: '#1F6FD0', data: [8.55, 5.57, 8.17, 7.18, 5.03, 4.70, 5.97, 6.70] }] } }
      ] },
      { t: 'group', id: 'tt-dma', title: 'TTTN theo ĐHT DMA', d: 'Tỷ lệ thất thoát theo vùng DMA.', children: [
        { t: 'tiles', id: 'tt-dma-k', cols: 3, items: [{ l: 'Vùng 1 kỳ 8', v: '7.61%', tone: 'red' }, { l: 'Vùng 2 kỳ 8', v: '7.69%', tone: 'orange' }, { l: 'Tổng vùng kỳ 8', v: '7.65%', tone: 'blue' }] },
        { t: 'card', id: 'tt-dma-v', title: 'TTN Vùng 1 và Vùng 2 từng kỳ', sub: 'Tỷ lệ TTN theo vùng DMA — 2026 — đơn vị %', filters: ['nam'], chart: { type: 'bar', fmt: 'pct', cats: KY(8), series: [
          { name: 'Vùng 2 (%)', color: '#D9822B', data: [7.55, 8.15, 6.97, 7.41, 7.08, 7.35, 7.68, 7.69] }, { name: 'Vùng 1 (%)', color: '#1F86E0', data: [7.09, 5.6, 7.2, 8.15, 8.15, 7.35, 7.29, 7.61] }] } },
        { t: 'card', id: 'tt-dma-t', title: 'TTN Tổng vùng từng kỳ', sub: 'Tỷ lệ TTN tổng vùng DMA — 2026 — đơn vị %', filters: ['nam'], chart: { type: 'bar', fmt: 'pct', cats: KY(8), series: [
          { name: 'Tổng vùng (%)', color: '#3D7BE0', data: [7.30, 7.53, 7.22, 7.98, 7.67, 7.37, 7.46, 7.65] }] } },
        { t: 'card', id: 'tt-dma-ss', title: 'So sánh Tổng vùng 2026 vs 2025', sub: 'So sánh theo từng kỳ — đơn vị %', filters: ['nam'], chart: { type: 'bar', fmt: 'pct', label: 1, cats: KY(8), series: [
          { name: '2025 (%)', color: '#7FA6E8', data: [7.1, 7.4, 7.3, 7.6, 7.5, 7.2, 7.3, 7.4] }, { name: '2026 (%)', color: '#1D4E9E', data: [7.30, 7.53, 7.22, 7.98, 7.67, 7.37, 7.46, 7.65] }] } }
      ] },
      { t: 'group', id: 'tt-be', title: 'Số điểm bể đã sửa', d: 'Số điểm bể ngầm/nổi đã sửa và nguyên nhân bể.', children: [
        { t: 'card', id: 'tt-be-ky', title: 'Số điểm bể từng kỳ', sub: 'Bể ngầm và bể nổi theo từng kỳ — Năm 2026', filters: ['nam'], chart: { type: 'bar', fmt: 'num', cats: KY(8), series: [
          { name: 'Bể ngầm (điểm)', color: '#1F7A6E', data: [66, 61, 38, 72, 91, 54, 72, 60] }, { name: 'Bể nổi (điểm)', color: '#E0A030', data: [115, 77, 63, 67, 52, 56, 78, 70] }], labelAll: true } },
        { t: 'card', id: 'tt-be-ss', title: 'So sánh Tổng điểm bể 2026 vs 2025', sub: 'Tổng số điểm bể theo từng kỳ', filters: ['nam'], chart: { type: 'bar', fmt: 'num', label: 1, cats: KY(8), series: [
          { name: '2025 (điểm)', color: '#C9B6F0', data: [170, 140, 110, 130, 150, 120, 140, 128] }, { name: '2026 (điểm)', color: '#7B4FD1', data: [181, 138, 101, 139, 143, 110, 150, 130] }] } },
        { t: 'card', id: 'tt-be-nn', title: 'Thống kê nguyên nhân bể', sub: 'Kỳ 8/2026 — Tổng 130 điểm bể', filters: ['nam', 'ky'], chart: { type: 'donut', center: 'điểm bể', suffix: ' điểm', items: [
          ['Nguyên nhân khác', 35], ['ODV bị tét đai, bể', 35], ['ODV bị gãy ngang', 27], ['ĐHN bị xì van góc, khóa góc', 17], ['ODV bị xì, hư đai khởi thủy', 9], ['Bể do đơn vị ngoài tác động', 7]] } }
      ] }
    ]
  },
  {
    key: 'gbbq', name: 'Giá bán bình quân',
    purpose: 'Theo dõi chỉ tiêu Giá bán bình quân (GBBQ - VNĐ/m³) thực tế so với mục tiêu kế hoạch, phân tích sự biến động theo kỳ hóa đơn và đợt đọc số.',
    steps: [
      ['Mở tab <b>Giá bán bình quân</b>. Khung tóm tắt hiển thị GBBQ thực tế, Kế hoạch và Tỷ lệ thực hiện.', 'tab:gbbq;target:gbbq-banner'],
      ['Chọn Chuẩn thu 1 hoặc 2.', 'tab:gbbq;target:gbbq-ct'],
      ['Thẻ <b>Giá bán bình quân theo kỳ</b>: chạm cột xem giá trị từng năm.', 'tab:gbbq;target:gbbq-ky;tip:4'],
      ['Thẻ <b>Giá bán bình quân theo đợt</b>: bấm phễu chọn Năm/Kỳ để so sánh các đợt.', 'tab:gbbq;target:gbbq-dot;open:filter']
    ],
    notes: ['GBBQ cả năm = Tổng doanh thu ÷ Tổng sản lượng lũy kế, không cộng bình quân giữa các kỳ.', 'Thẻ Giá bán bình quân theo kỳ tự ẩn khi không có dữ liệu.'],
    blocks: [
      { t: 'banner', id: 'gbbq-banner', bg: '#1FA67A', tl: 'Giá bán bình quân (VNĐ/m³)', tv: '12.170', rl: 'Tỷ lệ thực hiện', rv: '100.73%', bl: 'Kế hoạch (VNĐ/m³)', br: '12.082', prog: 100, pc: '#E8F5E9', d: 'GBBQ thực tế so với kế hoạch.' },
      { t: 'seg', id: 'gbbq-ct', options: CT, d: 'Công tắc chuẩn thu.' },
      { t: 'card', id: 'gbbq-ky', title: 'Giá bán bình quân theo kỳ', sub: 'So sánh 1/2026 vs 1/2025 — đơn vị: VNĐ/m³', d: 'GBBQ từng kỳ của 2 năm.', chart: { type: 'bar', fmt: 'vnd', label: 0, cats: KY(12), series: [
        { name: '1/2025 (đ/m³)', color: C2, data: [12100, 11700, 11800, 12200, 12000, 12100, 12000, 12100, 12050, 12150, 12200, 12100] },
        { name: '1/2026 (đ/m³)', color: '#1F86E0', data: [12150, 11800, 11750, 12300, 12100, 12200, 12100, 12200, 12210, 0, 0, 0] }] } },
      { t: 'card', id: 'gbbq-dot', title: 'Giá bán bình quân theo đợt', filters: ['nam', 'ky'], reset: 'all', d: 'GBBQ từng đợt, so sánh 3 mốc thời gian.', chart: { type: 'bar', fmt: 'vnd', label: 0, cats: DOT(6), series: [
        { name: '10/2025', color: C2, data: [10900, 11800, 12100, 11400, 12800, 11600] },
        { name: '10/2026', color: '#1F86E0', data: [11000, 11600, 12000, 11200, 13100, 11500] },
        { name: '9/2026', color: '#5BC8F5', data: [11300, 12000, 11900, 11600, 12900, 11700] }] } }
    ]
  },
  {
    key: 'thuho', name: 'Thu hộ tiền nước',
    purpose: 'Tổng hợp và phân tích kênh dòng tiền thanh toán qua các đối tác thu hộ, tổ chức tín dụng và phương thức thanh toán điện tử.',
    steps: [
      ['Mở tab <b>Thu hộ tiền nước</b>. Khung xanh hiển thị Tổng thu hộ năm và Tỷ lệ thực hiện.', 'tab:thuho;target:thuho-banner'],
      ['Khung <b>Chi tiết theo kỳ</b>: bấm phễu, chọn Năm, Kỳ, Từ ngày – Đến ngày. Ngày bị giới hạn trong tháng của kỳ đã chọn.', 'tab:thuho;target:thuho-ky;open:filter'],
      ['Thẻ <b>Phân bổ thu hộ theo đơn vị</b>: chạm lát donut để xem số tiền và tỷ lệ của đơn vị thu.', 'tab:thuho;target:thuho-dv;sel:0'],
      ['Thẻ <b>Xếp hạng phương thức thu</b>: đọc số hóa đơn • số tiền và tỷ lệ trên từng dòng.', 'tab:thuho;target:thuho-rank']
    ],
    notes: ['Xóa filter ở tab Thu hộ chỉ trả các ô về giá trị lúc vừa mở bảng lọc.'],
    blocks: [
      { t: 'banner', id: 'thuho-banner', bg: '#1A7FC1', tl: 'Tổng thu hộ tiền nước (VNĐ)', tv: '277.277.191.710', rl: 'Tỷ lệ thực hiện', rv: '96.14%', prog: 96.14, pc: '#FFFFFF', d: 'Tổng tiền thu hộ trong năm.' },
      { t: 'stats', id: 'thuho-ky', title: 'Chi tiết theo kỳ', filters: ['nam', 'ky', 'tungay', 'denngay'], reset: 'open', d: 'Số liệu thu hộ trong kỳ: tổng tiền, số hóa đơn, tỷ lệ.', items: [['Kỳ', '9/2026'], ['Tổng cộng', '22,51 tỷ'], ['Số HĐ', '68.592'], ['Tỷ lệ', '68.66%']] },
      { t: 'card', id: 'thuho-dv', title: 'Phân bổ thu hộ theo đơn vị', sub: '14 đơn vị · Tổng: 277,95 tỷ', d: 'Cơ cấu tiền thu hộ theo đơn vị thu.', chart: { type: 'donut', center: 'Tổng', fmt: 'tyc', items: [
        ['VCB', 76.40], ['VNPAY', 60.02], ['PAYOO', 53.96], ['MOMO', 50.10], ['MBBank', 16.15], ['ZaloPay', 10.37], ['PHUWACO', 3.87], ['Kho bạc', 2.33], ['OCB', 2.10], ['Agribank', 1.45], ['BIDV', 0.6], ['Vietinbank', 0.4], ['ACB', 0.12], ['Khác', 0.08]] } },
      { t: 'card', id: 'thuho-rank', title: 'Xếp hạng phương thức thu', filters: ['nam', 'ky', 'tungay', 'denngay'], reset: 'open', d: 'Xếp hạng đơn vị thu theo số tiền trong kỳ.', chart: { type: 'rank', color: '#3D6FE0', plain: true, items: [
        { n: 'VCB', v: '8.786 • 8,07 tỷ', p: 24.6 }, { n: 'VNPAY', v: '18.656 • 6,51 tỷ', p: 19.9 }, { n: 'PAYOO', v: '19.177 • 5,82 tỷ', p: 17.8 },
        { n: 'MOMO', v: '19.745 • 5,49 tỷ', p: 16.7 }, { n: 'MBBank', v: '6.091 • 1,84 tỷ', p: 5.6 }, { n: 'ZaloPay', v: '4.728 • 1,11 tỷ', p: 3.4 },
        { n: 'PHUWACO', v: '6.195 • 0,48 tỷ', p: 1.4 }, { n: 'Kho bạc', v: '24 • 0,27 tỷ', p: 0.8 }, { n: 'OCB', v: '827 • 0,25 tỷ', p: 0.8 }, { n: 'Agribank', v: '290 • 0,18 tỷ', p: 0.5 }] } }
    ]
  },
  {
    key: 'dd', name: 'Định danh', nofilter: true,
    purpose: 'Theo dõi tiến độ và tỷ lệ phủ mã định danh CCCD/Mã định danh cá nhân trên toàn bộ cơ sở dữ liệu khách hàng. Tab này hiển thị dữ liệu thời gian thực và không dùng bộ lọc.',
    steps: [
      ['Mở tab <b>Định danh</b>. Chọn <b>Đã định danh</b> hoặc <b>Chưa định danh</b>.', 'tab:dd;target:dd-seg'],
      ['Đọc khung tổng: Tổng số CCCD và tỷ lệ theo QLGT 1, QLGT 2.', 'tab:dd;target:dd-banner'],
      ['Thẻ <b>Phân bổ CCCD đã cập nhật theo phường</b>: chạm lát donut để xem số lượng và tỷ trọng.', 'tab:dd;target:dd-donut;sel:1'],
      ['Thẻ <b>Tỷ lệ hoàn thành định danh theo phường</b>: xếp hạng phường theo tỷ lệ CCCD đã cập nhật / tổng KH.', 'tab:dd;target:dd-rank'],
      ['Chuyển sang <b>Chưa định danh</b> để xem danh bộ chưa cập nhật CCCD theo phường.', 'tab:dd;target:dd-seg;seg:1']
    ],
    notes: ['Tab không có bộ lọc; dữ liệu luôn là thời gian thực.'],
    blocks: [
      { t: 'seg', id: 'dd-seg', options: ['Đã định danh', 'Chưa định danh'], d: 'Chuyển giữa dữ liệu đã / chưa định danh.', panes: [
        [
          { t: 'banner', id: 'dd-banner', bg: '#6A5ACD', tl: 'Tổng số CCCD', tv: '355.431', sub: [{ bg: '#18A07A', l: 'QLGT 1 · 48.26%', v: '171.524' }, { bg: '#E07B0C', l: 'QLGT 2 · 51.74%', v: '183.907' }], d: 'Tổng số CCCD đã cập nhật, chia theo QLGT.' },
          { t: 'card', id: 'dd-donut', title: 'Phân bổ CCCD đã cập nhật theo phường', sub: 'Tỷ trọng trên tổng số CCCD toàn đơn vị', d: 'Cơ cấu CCCD đã cập nhật theo phường.', chart: { type: 'donut', center: 'Tổng CCCD', items: [['Vườn Lài', 62908], ['Hòa Hưng', 59234], ['Minh Phụng', 53276], ['Diên Hồng', 49382], ['Bình Thới', 40552], ['Hòa Bình', 31152], ['Phú Thọ', 30956], ['Tân Phú', 27971]] } },
          { t: 'card', id: 'dd-rank', title: 'Tỷ lệ hoàn thành định danh theo phường', sub: 'Xếp hạng theo tỷ lệ CCCD đã cập nhật / tổng số KH', d: 'Xếp hạng phường theo tỷ lệ hoàn thành.', chart: { type: 'rank', color: '#1F6FD0', items: [
            { n: 'Vườn Lài', v: '62.908 • 68.644', p: 91 }, { n: 'Hòa Hưng', v: '59.234 • 68.269', p: 86 }, { n: 'Minh Phụng', v: '53.276 • 61.901', p: 86 }, { n: 'Diên Hồng', v: '49.382 • 57.620', p: 85 },
            { n: 'Tân Phú', v: '27.971 • 33.865', p: 82 }, { n: 'Bình Thới', v: '40.552 • 50.407', p: 80 }, { n: 'Hòa Bình', v: '31.152 • 40.102', p: 77 }, { n: 'Phú Thọ', v: '30.956 • 41.967', p: 73 }] } }
        ],
        [
          { t: 'banner', id: 'dd-banner2', bg: '#D62F2F', tl: 'Tổng danh bộ chưa cập CCCD', tv: '40.193', sub: [{ bg: '#18A07A', l: 'QLGT 1 · 48.61%', v: '19.536' }, { bg: '#E07B0C', l: 'QLGT 2 · 51.39%', v: '20.657' }] },
          { t: 'card', id: 'dd-donut2', title: 'Danh bộ chưa cập CCCD theo phường', sub: 'Tỷ trọng trên tổng số danh bộ chưa cập CCCD', chart: { type: 'donut', center: 'Tổng DB', items: [['Hòa Hưng', 7471], ['Vườn Lài', 6413], ['Diên Hồng', 5652], ['Minh Phụng', 5106], ['Bình Thới', 4231], ['Phú Thọ', 4157], ['Hòa Bình', 3765], ['Tân Phú', 3397], ['16', 1]] } }
        ]
      ] }
    ]
  },
  {
    key: 'ganmoi', name: 'Gắn mới ĐHN',
    purpose: 'Giám sát tiến độ phát triển khai thác khách hàng mới qua chỉ tiêu lắp đặt ĐHN gắn mới so với chỉ tiêu kế hoạch, cơ cấu theo địa bàn và đường kính đồng hồ.',
    steps: [
      ['Mở tab <b>Gắn mới ĐHN</b>. Khung cam: Số lượng gắn mới, Kế hoạch và Tỷ lệ đạt.', 'tab:ganmoi;target:gm-banner'],
      ['Thẻ <b>Phân bổ theo phường</b>: nút lọc mở thẳng danh sách <b>Chọn năm</b>, chọn xong tự tải lại.', 'tab:ganmoi;target:gm-phuong;open:filter'],
      ['Thẻ <b>Phân bổ theo cỡ ĐHN</b>: chạm lát donut để xem chi tiết từng cỡ.', 'tab:ganmoi;target:gm-co;sel:0']
    ],
    notes: [],
    blocks: [
      { t: 'banner', id: 'gm-banner', bg: '#F39200', tl: 'Số lượng gắn mới ĐHN', tv: '68', rl: 'Kế hoạch', rv: '50', bl: 'Tỷ lệ đạt', br: '136%', prog: 100, pc: '#4CAF50', d: 'Số ĐHN gắn mới so với kế hoạch năm.' },
      { t: 'card', id: 'gm-phuong', title: 'Phân bổ theo phường', filters: ['nam'], yearOnly: true, d: 'Cơ cấu ĐHN gắn mới theo phường. Chỉ lọc theo năm.', chart: { type: 'donut', center: 'Tổng', items: [['Bình Thới', 6], ['Diên Hồng', 3], ['Hòa Bình', 10], ['Hòa Hưng', 10], ['Minh Phụng', 7], ['Phú Thọ', 3], ['Tân Phú', 19], ['Vườn Lài', 6]] } },
      { t: 'card', id: 'gm-co', title: 'Phân bổ theo cỡ ĐHN', filters: ['nam'], yearOnly: true, d: 'Cơ cấu ĐHN gắn mới theo cỡ.', chart: { type: 'donut', center: 'Tổng', colors: ['#1E6A8D', '#4CD08A', '#F2C230'], items: [['Cỡ 15', 62], ['Khác', 1], ['Cỡ 50', 1]] } }
    ]
  },
  {
    key: 'doi', name: 'Dời ĐHN',
    purpose: 'Thống kê số lượng đồng hồ nước được thực hiện di dời vị trí theo yêu cầu của khách hàng hoặc quy hoạch kỹ thuật phân theo địa bàn.',
    steps: [
      ['Mở tab <b>Dời ĐHN</b>. Khung tím hiển thị tổng số lượng dời ĐHN.', 'tab:doi;target:doi-banner'],
      ['Thẻ <b>Dời ĐHN theo phường</b>: bấm phễu để chọn năm; chạm lát donut để xem chi tiết phường.', 'tab:doi;target:doi-phuong;sel:4']
    ],
    notes: [],
    blocks: [
      { t: 'banner', id: 'doi-banner', bg: '#D86FF3', tl: 'Tổng số lượng dời ĐHN theo phường', tv: '761', d: 'Tổng số ĐHN đã dời trong năm.' },
      { t: 'card', id: 'doi-phuong', title: 'Dời ĐHN theo phường', filters: ['nam'], yearOnly: true, d: 'Cơ cấu dời ĐHN theo phường.', chart: { type: 'donut', center: 'Tổng', items: [['Phú Thọ', 57], ['Tân Phú', 47], ['Hòa Bình', 54], ['Hòa Hưng', 175], ['Khác', 3], ['Minh Phụng', 79], ['Diên Hồng', 134], ['Bình Thới', 68], ['Vườn Lài', 144]] } }
    ]
  },
  {
    key: 'thay', name: 'Thay ĐHN',
    purpose: 'Theo dõi khối lượng công tác thay thế ĐHN định kỳ/sự cố (phân định rõ ĐHN cỡ nhỏ và ĐHN cỡ lớn) so với chỉ tiêu giao.',
    steps: [
      ['Mở tab <b>Thay ĐHN</b>. Chọn công tắc <b>Cỡ nhỏ</b> hoặc <b>Cỡ lớn</b>.', 'tab:thay;target:thay-seg'],
      ['Đọc khung tổng: số lượng đã thay, Kế hoạch và tỷ lệ hoàn thành.', 'tab:thay;target:thay-banner'],
      ['Thẻ <b>Phân bổ Thay ĐHN theo phường</b>: bấm phễu chọn năm. Năm dùng chung cho cả Cỡ nhỏ và Cỡ lớn.', 'tab:thay;target:thay-nho;open:filter'],
      ['Chuyển sang <b>Cỡ lớn</b> để xem số liệu ĐHN cỡ lớn.', 'tab:thay;target:thay-seg;seg:1']
    ],
    notes: ['Năm ở tab Thay ĐHN dùng chung cho cả Cỡ nhỏ và Cỡ lớn.'],
    blocks: [
      { t: 'seg', id: 'thay-seg', right: true, options: ['Cỡ nhỏ', 'Cỡ lớn'], d: 'Chuyển giữa ĐHN cỡ nhỏ và cỡ lớn.', panes: [
        [
          { t: 'banner', id: 'thay-banner', bg: '#1A73D9', tl: 'Thay ĐHN cỡ nhỏ', tv: '12.352', rl: 'Kế hoạch', rv: '15.000', bl: 'Năm 2026', br: '82.35%', prog: 82.35, pc: '#FFFFFF', d: 'Số lượng thay so với kế hoạch.' },
          { t: 'card', id: 'thay-nho', title: 'Phân bổ Thay ĐHN cỡ nhỏ theo phường', filters: ['nam'], yearOnly: true, shareYear: 'thay', d: 'Cơ cấu thay ĐHN theo phường.', chart: { type: 'donut', center: 'Tổng', items: [['Bình Thới', 1852], ['Diên Hồng', 1587], ['Hòa Bình', 1156], ['Hòa Hưng', 1937], ['Minh Phụng', 2318], ['Phú Thọ', 501], ['Tân Phú', 681], ['Vườn Lài', 2320]] } }
        ],
        [
          { t: 'banner', id: 'thay-banner2', bg: '#054D8E', tl: 'Thay ĐHN cỡ lớn', tv: '32', rl: 'Kế hoạch', rv: '30', bl: 'Năm 2026', br: '106.67%', prog: 100, pc: '#4CAF50' },
          { t: 'card', id: 'thay-lon', title: 'Phân bổ Thay ĐHN cỡ lớn theo phường', filters: ['nam'], yearOnly: true, shareYear: 'thay', chart: { type: 'donut', center: 'Tổng', items: [['Tân Phú', 1], ['Diên Hồng', 10], ['Bình Thới', 4], ['Vườn Lài', 9], ['Phú Thọ', 3], ['Hòa Bình', 6], ['Hòa Hưng', 12]] } }
        ]
      ] }
    ]
  },
  {
    key: 'dvkh', name: 'Hồ sơ DVKH',
    purpose: 'Quản lý tiến độ giải quyết các yêu cầu, phản ánh, khiếu nại và hồ sơ nghiệp vụ dịch vụ khách hàng tiếp nhận vào hệ thống.',
    steps: [
      ['Mở tab <b>Hồ sơ DVKH</b>. Khung tổng: Tổng hồ sơ, Đã xử lý và Tỷ lệ xử lý.', 'tab:dvkh;target:dvkh-banner'],
      ['Thẻ <b>Tỷ lệ xử lý hồ sơ</b>: donut Đã xử lý / Chưa xử lý.', 'tab:dvkh;target:dvkh-tl;sel:1'],
      ['Chọn công tắc <b>Chưa xử lý</b> / <b>Đã xử lý</b> để xem danh sách nội dung đơn tương ứng.', 'tab:dvkh;target:dvkh-seg'],
      ['Bấm phễu để lọc Năm, Kỳ, Từ ngày – Đến ngày và Nội dung đơn.', 'tab:dvkh;target:dvkh-seg;open:filter']
    ],
    notes: ['Xóa filter ở DVKH chỉ bỏ Nội dung, giữ nguyên Năm, Kỳ và ngày.'],
    blocks: [
      { t: 'banner', id: 'dvkh-banner', bg: '#AC943A', tl: 'Tổng hồ sơ DVKH', tv: '12.659', rl: 'Tỷ lệ xử lý', rv: '98.5%', bl: 'Đã xử lý', br: '12469 (98.5%)', prog: 98.5, pc: '#4CAF50', d: 'Tổng hồ sơ và tỷ lệ đã xử lý.' },
      { t: 'card', id: 'dvkh-tl', title: 'Tỷ lệ xử lý hồ sơ', sub: '12.659 hồ sơ', d: 'Donut tỷ lệ đã xử lý / chưa xử lý.', chart: { type: 'donut', center: 'Tổng', colors: ['#3D6FE0', '#D62F2F'], items: [['Đã xử lý', 12469], ['Chưa xử lý', 190]] } },
      { t: 'seg', id: 'dvkh-seg', filterOf: 'dvkh-list', filters: ['nam', 'ky', 'tungay', 'denngay', 'noidung'], reset: 'keep', icons: true, options: ['Chưa xử lý', 'Đã xử lý'], d: 'Danh sách nội dung đơn theo tình trạng, kèm bộ lọc.', panes: [
        [{ t: 'card', id: 'dvkh-list', title: 'Chưa xử lý', sub: '01/09/2026 – 30/09/2026', chart: { type: 'rank', color: '#3D6FE0', items: [
          { n: 'Đăng ký định mức', v: '20', p: 27.0 }, { n: 'Đăng ký định mức (App)', v: '10', p: 13.5 }, { n: 'Sang tên ĐHN', v: '10', p: 13.5 }, { n: 'Thắc mắc về thanh toán hoá đơn (Điện thoại)', v: '7', p: 9.5 },
          { n: 'Sang tên ĐHN (App)', v: '6', p: 8.1 }, { n: 'Nội dung khác', v: '5', p: 6.8 }, { n: 'Nội dung khác (Điện thoại)', v: '4', p: 5.4 }, { n: 'Thắc mắc về thanh toán hoá đơn', v: '3', p: 4.1 },
          { n: 'Nội dung khác (App)', v: '3', p: 4.1 }, { n: 'Nội dung khác (Website)', v: '2', p: 2.7 }, { n: 'Mở nước', v: '2', p: 2.7 }, { n: 'Kiểm tra Đồng hồ nước', v: '1', p: 1.4 }] } }],
        [{ t: 'card', id: 'dvkh-list2', title: 'Đã xử lý', sub: '01/09/2026 – 30/09/2026', chart: { type: 'rank', color: '#3D6FE0', items: [
          { n: 'Đăng ký định mức', v: '3.412', p: 27.4 }, { n: 'Sang tên ĐHN', v: '2.105', p: 16.9 }, { n: 'Đăng ký định mức (App)', v: '1.874', p: 15.0 }, { n: 'Thắc mắc về thanh toán hoá đơn', v: '1.122', p: 9.0 },
          { n: 'Nội dung khác', v: '980', p: 7.9 }, { n: 'Mở nước', v: '764', p: 6.1 }, { n: 'Kiểm tra Đồng hồ nước', v: '512', p: 4.1 }] } }]
      ] }
    ]
  },
  {
    key: 'ktks', name: 'Hồ sơ KTKS',
    purpose: 'Theo dõi tiến độ xử lý hồ sơ Kiểm tra kiểm soát. Cấu trúc giao diện và thao tác tương tự Tab Hồ sơ DVKH (chỉ khác biệt về nhận diện màu sắc xanh dương và bộ dữ liệu chuyên ngành KTKS).',
    steps: [
      ['Mở tab <b>Hồ sơ KTKS</b>. Khung xanh dương: Tổng hồ sơ KTKS và Tỷ lệ xử lý.', 'tab:ktks;target:ktks-banner'],
      ['Thẻ <b>Tỷ lệ xử lý hồ sơ</b>: donut Đã xử lý / Chưa xử lý.', 'tab:ktks;target:ktks-tl'],
      ['Chọn <b>Đã xử lý</b> để xem xếp hạng nội dung hồ sơ đã xử lý.', 'tab:ktks;target:ktks-seg;seg:1'],
      ['Bấm phễu để lọc Năm, Kỳ, ngày và Nội dung.', 'tab:ktks;target:ktks-seg;open:filter']
    ],
    notes: ['Xóa filter ở KTKS chỉ bỏ Nội dung, giữ nguyên Năm, Kỳ và ngày.'],
    blocks: [
      { t: 'banner', id: 'ktks-banner', bg: '#5AA0FE', tl: 'Tổng hồ sơ KTKS', tv: '28.241', rl: 'Tỷ lệ xử lý', rv: '96.0%', bl: 'Đã xử lý', br: '27102 (96.0%)', prog: 96, pc: '#4CAF50', d: 'Tổng hồ sơ KTKS và tỷ lệ xử lý.' },
      { t: 'card', id: 'ktks-tl', title: 'Tỷ lệ xử lý hồ sơ', sub: '28.241 hồ sơ', d: 'Donut tỷ lệ đã xử lý / chưa xử lý.', chart: { type: 'donut', center: 'Tổng', colors: ['#3D6FE0', '#D62F2F'], items: [['Đã xử lý', 27102], ['Chưa xử lý', 1139]] } },
      { t: 'seg', id: 'ktks-seg', filterOf: 'ktks-list', filters: ['nam', 'ky', 'tungay', 'denngay', 'noidung'], reset: 'keep', icons: true, options: ['Chưa xử lý', 'Đã xử lý'], d: 'Danh sách nội dung hồ sơ theo tình trạng.', panes: [
        [{ t: 'card', id: 'ktks-list', title: 'Chưa xử lý', sub: '01/09/2026 – 30/09/2026', chart: { type: 'rank', color: '#D62F2F', items: [
          { n: 'Bảng kê ĐHN đứt chì góc', v: '280', p: 40.2 }, { n: 'Sang tên ĐHN', v: '367', p: 27.8 }, { n: 'Đăng ký định mức (App)', v: '79', p: 6.0 }, { n: 'Đăng ký định mức (Website)', v: '66', p: 5.0 },
          { n: 'Nội dung khác', v: '64', p: 4.8 }, { n: 'Kiểm tra Đồng hồ nước (Điện thoại)', v: '42', p: 3.2 }] } }],
        [{ t: 'card', id: 'ktks-list2', title: 'Đã xử lý', sub: '01/09/2026 – 30/09/2026', chart: { type: 'rank', color: '#D62F2F', items: [
          { n: 'Truy thu', v: '1.216', p: 37.7 }, { n: 'Đăng ký định mức', v: '493', p: 15.3 }, { n: 'Sang tên ĐHN', v: '371', p: 11.5 }, { n: 'Cập nhật mã định danh', v: '283', p: 8.8 },
          { n: 'Kiểm tra ĐM', v: '252', p: 7.8 }, { n: 'Khác', v: '159', p: 4.9 }, { n: 'Kiểm tra ĐHN', v: '85', p: 2.6 }, { n: 'Phiếu báo địa chỉ thay đổi công dụng', v: '81', p: 2.5 },
          { n: 'Đồng hồ nước ngưng', v: '79', p: 2.5 }, { n: 'Đồng hồ nước đứt chì', v: '50', p: 1.6 }, { n: 'Kiểm tra GB', v: '28', p: 0.9 }, { n: 'Chuyển đề', v: '24', p: 0.7 }] } }]
      ] }
    ]
  },
  {
    key: 'hoadon', name: 'Hóa đơn',
    purpose: 'Giám sát bất thường qua thống kê số lượng hóa đơn phát sinh sản lượng thấp (hóa đơn 0m³ và từ 1 đến 4m³) phân bổ theo kỳ đọc số và đợt phát hành.',
    steps: [
      ['Mở tab <b>Hóa đơn</b>. Khung tổng: tổng hóa đơn 0-4m³, số kỳ, chia hóa đơn 0m³ và 1-4m³.', 'tab:hoadon;target:hd-banner'],
      ['Thẻ <b>Hóa đơn 0m³</b>, <b>Hóa đơn 1-4m³</b>: số hóa đơn theo kỳ.', 'tab:hoadon;target:hd-0'],
      ['Thẻ <b>Hóa đơn 0-4m³</b>: so sánh DS Mới (0m³) và DS Cũ (1-4m³) theo kỳ.', 'tab:hoadon;target:hd-04;tip:2'],
      ['Thẻ <b>Hóa đơn 4m³ chi tiết theo đợt</b>: bấm phễu lọc Năm, Kỳ, Phường.', 'tab:hoadon;target:hd-dot;open:filter']
    ],
    notes: ['Các thẻ Hóa đơn 0m³ / 1-4m³ / 0-4m³ tự ẩn khi không có dữ liệu.', 'Xóa filter ở Hóa đơn theo đợt chỉ bỏ Phường, giữ Năm và Kỳ.'],
    blocks: [
      { t: 'banner', id: 'hd-banner', bg: '#2E9B5F', cap: 'HÓA ĐƠN THEO LOẠI SẢN LƯỢNG', tl: 'Tổng hóa đơn 0-4m³ 2026', tv: '104.317', rl: 'Số kỳ', rv: '9', sub: [{ bg: '#3D7BE0', l: 'Hóa đơn 0m³', v: '44.168' }, { bg: '#E07B0C', l: 'Hóa đơn 1-4m³', v: '60.149' }], d: 'Tổng hóa đơn sản lượng thấp trong năm.' },
      { t: 'card', id: 'hd-0', title: 'Hóa đơn 0m³', d: 'Số hóa đơn 0m³ theo kỳ.', chart: { type: 'bar', fmt: 'm3', cats: KY(9), series: [{ name: 'Hóa đơn 0m³', color: '#1A73D9', data: [4900, 4700, 7600, 4900, 4800, 4800, 4800, 4700, 3168] }] } },
      { t: 'card', id: 'hd-14', title: 'Hóa đơn 1-4m³', d: 'Số hóa đơn 1-4m³ theo kỳ.', chart: { type: 'bar', fmt: 'm3', cats: KY(9), series: [{ name: 'Hóa đơn 1-4m³', color: '#1A73D9', data: [6800, 6700, 7500, 6300, 6500, 6400, 6800, 6600, 7549] }] } },
      { t: 'card', id: 'hd-04', title: 'Hóa đơn 0-4m³', d: 'So sánh DS Mới (0m³) và DS Cũ (1-4m³).', chart: { type: 'bar', fmt: 'm3', label: 0, cats: KY(9), series: [
        { name: 'DS Mới (0m³) (HĐ)', color: C2, data: [11600, 11400, 13000, 11200, 11300, 11200, 11700, 11300, 10717] }, { name: 'DS Cũ (1-4m³) (HĐ)', color: '#1F86E0', data: [11000, 11200, 12400, 10800, 11000, 10900, 11300, 11000, 10200] }] } },
      { t: 'card', id: 'hd-dot', title: 'Hóa đơn 4m³ chi tiết theo đợt', filters: ['nam', 'ky', 'phuong'], reset: 'keep', d: 'Hóa đơn sản lượng thấp theo đợt của kỳ, so sánh 3 mốc.', chart: { type: 'bar', fmt: 'num', label: 0, cats: DOT(8), series: [
        { name: '9/2025 (HĐ)', color: C2, data: [1100, 1300, 948, 1300, 871, 847, 820, 963] }, { name: '9/2026 (HĐ)', color: '#1F86E0', data: [1050, 1200, 900, 1350, 820, 800, 790, 940] }, { name: '8/2026 (HĐ)', color: '#5BC8F5', data: [1000, 1150, 880, 1400, 800, 810, 760, 910] }] } }
    ]
  },
  {
    key: 'sawaco', name: 'KH đã tải app Sawaco', nofilter: true,
    purpose: 'Đánh giá mức độ chuyển đổi số qua tỷ lệ khách hàng đăng ký và cài đặt ứng dụng Sawaco trên địa bàn. Tab này không dùng bộ lọc.',
    steps: [
      ['Mở tab <b>KH đã tải app Sawaco</b>. Khung tổng: số KH đã tải app, tỷ lệ tải app, tổng KH và số chưa tải.', 'tab:sawaco;target:sw-banner'],
      ['Thẻ <b>Phân bổ theo phường</b>: chạm lát donut hoặc mục chú thích để xem số KH đã tải app của phường.', 'tab:sawaco;target:sw-phuong;sel:0'],
      ['Chuyển sang <b>Bảng</b> để xem số liệu kèm tỷ lệ.', 'tab:sawaco;target:sw-phuong;view:table']
    ],
    notes: ['Tab không dùng bộ lọc.'],
    blocks: [
      { t: 'sawaco', id: 'sw-banner', d: 'Số khách hàng đã tải app Sawaco và tỷ lệ trên tổng khách hàng.' },
      { t: 'card', id: 'sw-phuong', title: 'Phân bổ theo phường', d: 'Cơ cấu KH đã tải app theo phường.', chart: { type: 'donut', center: 'Tổng', items: [['Minh Phụng', 3248], ['Vườn Lài', 2698], ['Bình Thới', 2625], ['Hòa Bình', 2191], ['Hòa Hưng', 1837], ['Phú Thọ', 1776], ['Tân Phú', 1645], ['Diên Hồng', 1532]] } }
    ]
  }
];

const IMGS = {
  ov: ['ov_003', 'ov_004', 'ov_006', 'ov_007', 'ov_012'],
  kh: ['kh_013', 'kh_014', 'kh_015', 'kh_016'],
  sl: ['sl_017', 'sl_018', 'sl_019', 'sl_020', 'sl_021', 'sl_022', 'sl_023', 'sl_024', 'sl_025', 'sl_026'],
  dt: ['dt_027', 'dt_028', 'dt_029'],
  tt: ['tt_030', 'tt_031', 'tt_032', 'tt_033', 'tt_034', 'tt_035', 'tt_036', 'tt_037', 'tt_038', 'tt_039'],
  gbbq: ['gbbq_040', 'gbbq_041', 'gbbq_042'],
  thuho: ['thuho_043', 'thuho_044'],
  dd: ['dd_045', 'dd_046', 'dd_047'],
  ganmoi: ['ganmoi_048', 'ganmoi_049'],
  doi: ['doi_050'],
  thay: ['thay_051', 'thay_052'],
  dvkh: ['dvkh_053', 'dvkh_054', 'dvkh_055'],
  ktks: ['ktks_056', 'ktks_057', 'ktks_058'],
  hoadon: ['hoadon_059', 'hoadon_060', 'hoadon_061'],
  sawaco: ['sawaco_062']
};
