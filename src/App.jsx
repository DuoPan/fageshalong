import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  BadgeCheck,
  Bell,
  CalendarClock,
  CalendarDays,
  ChartNoAxesCombined,
  ChevronRight,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  CreditCard,
  Crown,
  Download,
  Gem,
  Gift,
  HandCoins,
  HeartHandshake,
  History,
  Home,
  Images,
  LayoutDashboard,
  LogIn,
  MapPin,
  MessageCircle,
  PackageCheck,
  PanelLeft,
  Phone,
  QrCode,
  ReceiptText,
  Scissors,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  TicketPercent,
  User,
  UserRoundCheck,
  UsersRound,
  WalletCards,
  WandSparkles,
} from 'lucide-react';
import { brand } from './brand';
import {
  chartBars,
  initialAppointments,
  inventory,
  members,
  services,
  stylists,
} from './data';

const statusClass = {
  待到店: 'waiting',
  服务中: 'active',
  已完成: 'done',
  爽约风险: 'risk',
};

function Logo() {
  return (
    <div className="brand-lockup">
      <div className="brand-logo">{brand.logoText}</div>
      <div>
        <strong>{brand.name}</strong>
        <span>{brand.legalName}</span>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, delta, tone = 'gold' }) {
  return (
    <article className={`stat-card ${tone}`}>
      <Icon size={20} />
      <span>{label}</span>
      <strong>{value}</strong>
      <em>{delta}</em>
    </article>
  );
}

function SectionTitle({ eyebrow, title, action }) {
  return (
    <div className="section-title">
      <div>
        <span>{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {action}
    </div>
  );
}

function AdminView({ appointments, setAppointments }) {
  const [selectedAppointment, setSelectedAppointment] = useState(appointments[1]);
  const [payMethod, setPayMethod] = useState('储值卡');

  const revenue = appointments.reduce((sum, item) => sum + item.value, 0);
  const doneCount = appointments.filter((item) => item.status === '已完成').length;

  function updateStatus(status) {
    setAppointments((items) =>
      items.map((item) =>
        item.id === selectedAppointment.id ? { ...item, status } : item,
      ),
    );
    setSelectedAppointment((item) => ({ ...item, status }));
  }

  return (
    <div className="admin-grid">
      <aside className="sidebar">
        <Logo />
        <nav>
          {[
            ['经营看板', LayoutDashboard],
            ['预约排班', CalendarClock],
            ['收银结算', ReceiptText],
            ['会员中心', Crown],
            ['员工绩效', HandCoins],
            ['库存耗材', PackageCheck],
            ['数据报表', ChartNoAxesCombined],
          ].map(([label, Icon]) => (
            <button className={label === '经营看板' ? 'nav-item current' : 'nav-item'} key={label}>
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>
        <div className="tenant-card">
          <PanelLeft size={18} />
          <strong>多门店可定制</strong>
          <span>Logo、主题色、服务项目和员工资料均可替换。</span>
        </div>
      </aside>

      <main className="admin-main">
        <header className="topbar">
          <div>
            <p>门店运营中枢</p>
            <h1>{brand.name} 今日经营实况</h1>
          </div>
          <div className="topbar-actions">
            <div className="search-box">
              <Search size={18} />
              <span>搜索顾客 / 预约 / 团购码</span>
            </div>
            <button className="icon-button" aria-label="提醒">
              <Bell size={18} />
            </button>
            <button className="primary-button">
              <QrCode size={18} />
              到店核销
            </button>
          </div>
        </header>

        <section className="hero-panel">
          <div className="hero-copy">
            <span className="pill"><Sparkles size={15} /> AI 智能排班已开启</span>
            <h2>今天高峰在 14:00-16:00，建议把长时段染烫集中到 B 区工位。</h2>
            <p>{brand.slogan}。当前有 2 个低库存耗材、3 个复购提醒、1 个爽约风险。</p>
          </div>
          <div className="hero-metrics">
            <StatCard icon={CalendarClock} label="今日预约" value={appointments.length} delta="+18%" />
            <StatCard icon={CreditCard} label="预计流水" value={`$${revenue}`} delta="含定金 $260" tone="blue" />
            <StatCard icon={UsersRound} label="到店完成" value={`${doneCount}/${appointments.length}`} delta="准点率 91%" tone="mint" />
            <StatCard icon={Gem} label="会员转化" value="38%" delta="+6.4%" tone="coral" />
          </div>
        </section>

        <section className="content-grid">
          <div className="panel schedule-panel">
            <SectionTitle
              eyebrow="Booking Core"
              title="预约排班与工位占用"
              action={<button className="ghost-button"><WandSparkles size={16} /> AI 推荐时段</button>}
            />
            <div className="timeline">
              {appointments.map((item) => (
                <button
                  className={`appointment-row ${selectedAppointment.id === item.id ? 'selected' : ''}`}
                  key={item.id}
                  onClick={() => setSelectedAppointment(item)}
                >
                  <time>{item.time}</time>
                  <div>
                    <strong>{item.customer}</strong>
                    <span>{item.service} · {item.duration} 分钟 · {item.station}</span>
                  </div>
                  <b>{item.stylist}</b>
                  <em className={`status ${statusClass[item.status]}`}>{item.status}</em>
                </button>
              ))}
            </div>
          </div>

          <div className="panel detail-panel">
            <SectionTitle eyebrow="Front Desk" title="预约改单 / 到店开单" />
            <div className="customer-card">
              <div className="avatar-badge">{selectedAppointment.customer.slice(0, 1)}</div>
              <div>
                <h3>{selectedAppointment.customer}</h3>
                <p>{selectedAppointment.phone}</p>
              </div>
            </div>
            <dl className="detail-list">
              <div><dt>服务项目</dt><dd>{selectedAppointment.service}</dd></div>
              <div><dt>发型师</dt><dd>{selectedAppointment.stylist}</dd></div>
              <div><dt>工位占用</dt><dd>{selectedAppointment.station} · {selectedAppointment.duration} 分钟</dd></div>
              <div><dt>应收金额</dt><dd>${selectedAppointment.value}</dd></div>
            </dl>
            <div className="status-actions">
              {['待到店', '服务中', '已完成', '爽约风险'].map((status) => (
                <button key={status} onClick={() => updateStatus(status)}>{status}</button>
              ))}
            </div>
          </div>

          <div className="panel cashier-panel">
            <SectionTitle eyebrow="Cashier" title="智能收银单" />
            <div className="receipt-box">
              <div><span>项目金额</span><strong>${selectedAppointment.value}</strong></div>
              <div><span>会员折扣</span><strong>-$18</strong></div>
              <div><span>团购券核销</span><strong>可用</strong></div>
              <div className="receipt-total"><span>实收</span><strong>${Math.max(selectedAppointment.value - 18, 0)}</strong></div>
            </div>
            <div className="pay-methods">
              {['微信', '支付宝', '现金', '储值卡', '次卡', '团购券'].map((method) => (
                <button
                  className={payMethod === method ? 'active' : ''}
                  key={method}
                  onClick={() => setPayMethod(method)}
                >
                  {method}
                </button>
              ))}
            </div>
            <div className="commission-strip">
              <HandCoins size={18} />
              <span>提成拆分：服务 $42 · 售卡 $0 · 产品 $12</span>
            </div>
          </div>

          <div className="panel member-panel">
            <SectionTitle eyebrow="CRM" title="会员画像与复购雷达" />
            <div className="member-list">
              {members.map((member) => (
                <article key={member.name}>
                  <div>
                    <strong>{member.name}</strong>
                    <span>{member.level} · 余额 ${member.balance}</span>
                  </div>
                  <p>{member.nextAction}</p>
                  <footer>{member.tags.map((tag) => <em key={tag}>{tag}</em>)}</footer>
                </article>
              ))}
            </div>
          </div>

          <div className="panel performance-panel">
            <SectionTitle eyebrow="Team" title="员工绩效排行" />
            {stylists.map((stylist, index) => (
              <div className="staff-row" key={stylist.id}>
                <img src={stylist.avatar} alt={stylist.name} />
                <div>
                  <strong>{index + 1}. {stylist.name}</strong>
                  <span>{stylist.role} · 评分 {stylist.rating}</span>
                </div>
                <b>${stylist.commission}</b>
              </div>
            ))}
          </div>

          <div className="panel ops-panel">
            <SectionTitle eyebrow="Inventory & Report" title="库存预警 / 经营热力" />
            <div className="inventory-list">
              {inventory.map((item) => (
                <div key={item.name}>
                  <span>{item.name}</span>
                  <strong className={item.status === '低库存' ? 'danger' : ''}>{item.stock}{item.unit}</strong>
                </div>
              ))}
            </div>
            <div className="bar-chart">
              {chartBars.map((bar) => (
                <div key={bar.label}>
                  <i style={{ height: `${bar.value}%` }} />
                  <span>{bar.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function StaffView({ appointments }) {
  const next = appointments.find((item) => item.status !== '已完成') || appointments[0];

  return (
    <div className="phone-stage">
      <div className="phone-shell staff-phone">
        <header className="mobile-header">
          <Logo />
          <span className="status active">上班中</span>
        </header>
        <section className="staff-hero">
          <p>今日预计提成</p>
          <strong>$1,268</strong>
          <span>已完成 4 单 · 待服务 3 单 · 好评率 98%</span>
        </section>
        <section className="mobile-card next-card">
          <div className="section-title compact">
            <div>
              <span>Next Customer</span>
              <h2>下一位顾客</h2>
            </div>
            <Clock3 size={20} />
          </div>
          <h3>{next.customer}</h3>
          <p>{next.service} · {next.time} · {next.station}</p>
          <div className="note-box">会员偏好：少打薄，冷棕色系，Mika 上次配方 7/71 + 6/11。</div>
          <button className="primary-button full">开始服务</button>
        </section>
        <section className="mobile-card">
          <SectionTitle eyebrow="Schedule" title="今日预约" />
          {appointments.slice(0, 5).map((item) => (
            <div className="mobile-list-row" key={item.id}>
              <time>{item.time}</time>
              <div>
                <strong>{item.customer}</strong>
                <span>{item.service}</span>
              </div>
              <em className={`status ${statusClass[item.status]}`}>{item.status}</em>
            </div>
          ))}
        </section>
        <section className="task-grid">
          <article><MessageCircle size={18} /><strong>3</strong><span>回访任务</span></article>
          <article><Star size={18} /><strong>4.98</strong><span>本月评分</span></article>
          <article><CreditCard size={18} /><strong>$680</strong><span>售卡业绩</span></article>
        </section>
      </div>
    </div>
  );
}

function MemberView() {
  const [page, setPage] = useState('home');
  const [loggedIn, setLoggedIn] = useState(false);
  const [phone, setPhone] = useState('0418 667 210');
  const [service, setService] = useState(services[1]);
  const [stylist, setStylist] = useState(stylists[1]);
  const [date, setDate] = useState('今天');
  const [slot, setSlot] = useState('14:30');
  const [bookingStatus, setBookingStatus] = useState('ready');
  const [memberBookings, setMemberBookings] = useState([
    { id: 'B2406', service: '雾感染发', stylist: 'Mika', date: '今天', slot: '14:30', status: '待到店', price: 368 },
    { id: 'B2391', service: '头皮护理 Spa', stylist: 'Nora', date: '6 月 12 日', slot: '16:00', status: '已完成', price: 168 },
    { id: 'B2378', service: '高级洗剪吹', stylist: 'Jay', date: '5 月 28 日', slot: '11:00', status: '已完成', price: 88 },
  ]);

  const slots = ['10:30', '11:15', '13:00', '14:30', '15:45', '17:00', '18:15', '19:30'];
  const dates = ['今天', '明天', '周五', '周六', '周日'];
  const loggedInMember = members[1];
  const coupons = [
    { name: '染烫补色券', value: '$58', expires: '7 天后过期' },
    { name: '生日护理礼', value: '免费', expires: '本月可用' },
    { name: '老带新奖励', value: '$30', expires: '长期有效' },
  ];
  const hairRecords = [
    {
      id: 'H3',
      date: '2026-06-12',
      title: '冷棕雾感染发',
      stylist: 'Mika',
      formula: '7/71 + 6/11，低双氧 35 分钟',
      image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 'H2',
      date: '2026-04-18',
      title: '空气层次修剪',
      stylist: 'Leo 发哥',
      formula: '保留发尾厚度，刘海轻薄处理',
      image: 'https://images.unsplash.com/photo-1523263685509-57c1d050d19b?auto=format&fit=crop&w=900&q=80',
    },
  ];

  function go(nextPage) {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function startBooking(nextService = service) {
    setService(nextService);
    setBookingStatus('ready');
    go('booking');
  }

  function submitLogin(event) {
    event.preventDefault();
    setLoggedIn(true);
    go('home');
  }

  function confirmBooking() {
    const newBooking = {
      id: `B${Math.floor(3000 + Math.random() * 900)}`,
      service: service.name,
      stylist: stylist.name,
      date,
      slot,
      status: '待到店',
      price: service.price,
    };
    setMemberBookings((items) => [newBooking, ...items]);
    setBookingStatus('success');
    go('success');
  }

  function cancelBooking(id) {
    setMemberBookings((items) =>
      items.map((item) => (item.id === id ? { ...item, status: '已取消' } : item)),
    );
  }

  const navItems = [
    { id: 'home', label: '首页', icon: Home },
    { id: 'services', label: '服务', icon: Scissors },
    { id: 'stylists', label: '发型师', icon: UserRoundCheck },
    { id: 'appointments', label: '预约', icon: CalendarDays },
    { id: 'membership', label: '会员卡', icon: WalletCards },
    { id: 'records', label: '发型档案', icon: Images },
    { id: 'profile', label: '我的', icon: User },
  ];

  const MemberNav = () => (
    <header className="member-web-nav">
      <Logo />
      <nav>
        {navItems.map(({ id, label, icon: Icon }) => (
          <button className={page === id ? 'active' : ''} key={id} onClick={() => go(id)}>
            <Icon size={17} />
            {label}
          </button>
        ))}
      </nav>
      <button className="member-login-button" onClick={() => (loggedIn ? go('profile') : go('login'))}>
        {loggedIn ? <BadgeCheck size={17} /> : <LogIn size={17} />}
        {loggedIn ? loggedInMember.name : '登录'}
      </button>
    </header>
  );

  const BackButton = ({ target = 'home' }) => (
    <button className="member-back" onClick={() => go(target)}>
      <ArrowLeft size={17} />
      返回
    </button>
  );

  const LoginPage = () => (
    <main className="member-login-page">
      <section className="member-login-art">
        <Logo />
        <h1>欢迎来到{brand.name}</h1>
        <p>登录后可查看会员卡、优惠券、预约记录和专属发型档案。</p>
        <div className="login-perks">
          <span><ShieldCheck size={16} /> 纯前端模拟登录</span>
          <span><TicketPercent size={16} /> 自动带出会员权益</span>
          <span><History size={16} /> 查看历史配方和消费</span>
        </div>
      </section>
      <form className="member-login-form" onSubmit={submitLogin}>
        <span>Member Login</span>
        <h2>手机号快捷登录</h2>
        <label>
          手机号
          <input value={phone} onChange={(event) => setPhone(event.target.value)} />
        </label>
        <label>
          验证码
          <div className="code-row">
            <input defaultValue="888888" />
            <button type="button">获取验证码</button>
          </div>
        </label>
        <button className="member-primary" type="submit">登录并进入会员中心</button>
        <button className="member-secondary" type="button" onClick={() => go('home')}>游客继续浏览</button>
      </form>
    </main>
  );

  const HomePage = () => (
    <main className="member-web-main">
      <section className="member-web-hero">
        <div className="member-hero-text">
          <span className="pill"><Sparkles size={15} /> 可在线预约 · 到店核销 · 会员权益</span>
          <h1>{brand.name}</h1>
          <p>{brand.slogan}。为会员提供预约、排队、会员卡、发型档案和售后回访的一站式网页体验。</p>
          <div className="member-hero-actions">
            <button className="member-primary" onClick={() => startBooking()}>立即预约</button>
            <button className="member-secondary" onClick={() => go('services')}>浏览服务</button>
          </div>
        </div>
        <div className="member-hero-card">
          <img src="https://images.unsplash.com/photo-1633681926035-ec1ac984418a?auto=format&fit=crop&w=1000&q=80" alt="发哥沙龙门店环境" />
          <div className="member-store-strip">
            <span><MapPin size={16} /> {brand.address}</span>
            <span><Phone size={16} /> {brand.phone}</span>
            <span><Clock3 size={16} /> {brand.hours}</span>
          </div>
        </div>
      </section>

      <section className="member-quick-grid">
        <button onClick={() => go('appointments')}><CalendarDays size={20} /><strong>我的预约</strong><span>{memberBookings[0].date} {memberBookings[0].slot}</span></button>
        <button onClick={() => go('membership')}><WalletCards size={20} /><strong>黑金会员</strong><span>余额 ${loggedInMember.balance}</span></button>
        <button onClick={() => go('records')}><Images size={20} /><strong>发型档案</strong><span>2 次配方记录</span></button>
        <button onClick={() => go('services')}><TicketPercent size={20} /><strong>可用优惠</strong><span>{coupons.length} 张优惠券</span></button>
      </section>

      <section className="member-two-col">
        <div className="member-web-panel">
          <SectionTitle eyebrow="Featured Services" title="推荐服务" action={<button onClick={() => go('services')}>查看全部</button>} />
          <div className="member-service-grid">
            {services.slice(0, 3).map((item) => (
              <article key={item.id} onClick={() => startBooking(item)}>
                <img src={item.image} alt={item.name} />
                <div>
                  <strong>{item.name}</strong>
                  <span>${item.price} · {item.duration} 分钟</span>
                  <p>{item.tags.join(' / ')}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="member-web-panel">
          <SectionTitle eyebrow="Queue" title="实时排队" />
          <div className="queue-dashboard">
            <strong>前方 3 人</strong>
            <span>预计等待 18 分钟</span>
            <div><i style={{ width: '62%' }} /></div>
            <button className="member-secondary" onClick={() => go('appointments')}>查看预约进度</button>
          </div>
        </div>
      </section>
    </main>
  );

  const ServicesPage = () => (
    <main className="member-web-main">
      <BackButton />
      <SectionTitle eyebrow="Services" title="服务项目" />
      <div className="member-catalog-grid">
        {services.map((item) => (
          <article className="member-catalog-card" key={item.id}>
            <img src={item.image} alt={item.name} />
            <div>
              <span>{item.category}</span>
              <h3>{item.name}</h3>
              <p>{item.tags.join(' · ')}</p>
              <footer>
                <strong>${item.price}</strong>
                <em>{item.duration} 分钟</em>
              </footer>
              <div className="catalog-actions">
                <button onClick={() => { setService(item); go('service-detail'); }}>查看详情</button>
                <button onClick={() => startBooking(item)}>预约</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );

  const ServiceDetailPage = () => (
    <main className="member-web-main">
      <BackButton target="services" />
      <section className="member-detail-hero">
        <img src={service.image} alt={service.name} />
        <div>
          <span>{service.category}</span>
          <h1>{service.name}</h1>
          <p>适合希望获得稳定效果和完整服务记录的会员。系统会保存服务偏好、耗材和回访任务，方便下次复购。</p>
          <dl>
            <div><dt>价格</dt><dd>${service.price}</dd></div>
            <div><dt>时长</dt><dd>{service.duration} 分钟</dd></div>
            <div><dt>热度</dt><dd>{service.popularity}%</dd></div>
          </dl>
          <button className="member-primary" onClick={() => startBooking(service)}>预约这个项目</button>
        </div>
      </section>
    </main>
  );

  const StylistsPage = () => (
    <main className="member-web-main">
      <BackButton />
      <SectionTitle eyebrow="Stylists" title="选择发型师" />
      <div className="member-stylist-grid">
        {stylists.map((item) => (
          <article key={item.id}>
            <img src={item.avatar} alt={item.name} />
            <div>
              <h3>{item.name}</h3>
              <span>{item.role}</span>
              <p>{item.skills.join(' · ')}</p>
              <footer><Star size={15} /> {item.rating} · {item.bookings} 次预约</footer>
              <button onClick={() => { setStylist(item); go('stylist-detail'); }}>查看作品</button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );

  const StylistDetailPage = () => (
    <main className="member-web-main">
      <BackButton target="stylists" />
      <section className="stylist-detail">
        <img src={stylist.avatar} alt={stylist.name} />
        <div>
          <span>{stylist.role}</span>
          <h1>{stylist.name}</h1>
          <p>{stylist.skills.join(' / ')}。评分 {stylist.rating}，累计 {stylist.bookings} 次预约。</p>
          <div className="portfolio-strip">
            {services.slice(0, 3).map((item) => <img src={item.image} alt={item.name} key={item.id} />)}
          </div>
          <button className="member-primary" onClick={() => startBooking(service)}>预约 {stylist.name}</button>
        </div>
      </section>
    </main>
  );

  const BookingPage = () => (
    <main className="member-web-main">
      <BackButton />
      <section className="booking-layout">
        <div className="member-web-panel">
          <SectionTitle eyebrow="Step 1" title="选择项目" />
          <div className="booking-choice-list">
            {services.map((item) => (
              <button className={service.id === item.id ? 'active' : ''} key={item.id} onClick={() => setService(item)}>
                <img src={item.image} alt={item.name} />
                <span><strong>{item.name}</strong><em>${item.price} · {item.duration} 分钟</em></span>
              </button>
            ))}
          </div>
        </div>
        <div className="member-web-panel">
          <SectionTitle eyebrow="Step 2" title="选择发型师" />
          <div className="booking-choice-list compact">
            {stylists.map((item) => (
              <button className={stylist.id === item.id ? 'active' : ''} key={item.id} onClick={() => setStylist(item)}>
                <img src={item.avatar} alt={item.name} />
                <span><strong>{item.name}</strong><em>{item.role} · {item.rating}</em></span>
              </button>
            ))}
          </div>
        </div>
        <div className="member-web-panel booking-summary-panel">
          <SectionTitle eyebrow="Step 3" title="确认时间" />
          <div className="date-tabs">
            {dates.map((item) => <button className={date === item ? 'active' : ''} key={item} onClick={() => setDate(item)}>{item}</button>)}
          </div>
          <div className="slot-grid member-slots">
            {slots.map((item) => <button className={slot === item ? 'active' : ''} key={item} onClick={() => setSlot(item)}>{item}</button>)}
          </div>
          <textarea placeholder="备注：例如头发长度、偏好颜色、是否需要安静服务" />
          <div className="booking-confirm-card">
            <strong>{service.name} · {stylist.name}</strong>
            <span>{date} {slot} · ${service.price} · {service.duration} 分钟</span>
          </div>
          <button className="member-primary" onClick={confirmBooking}>确认预约</button>
        </div>
      </section>
    </main>
  );

  const SuccessPage = () => (
    <main className="member-web-main success-page">
      <CheckCircle2 size={72} />
      <h1>预约成功</h1>
      <p>{service.name} · {stylist.name} · {date} {slot}</p>
      <div className="success-actions">
        <button className="member-primary" onClick={() => go('appointments')}>查看我的预约</button>
        <button className="member-secondary" onClick={() => go('home')}>回到首页</button>
      </div>
      {bookingStatus === 'success' && <span className="success-note">已模拟发送到店前 30 分钟提醒。</span>}
    </main>
  );

  const AppointmentsPage = () => (
    <main className="member-web-main">
      <BackButton />
      <SectionTitle eyebrow="Bookings" title="我的预约" action={<button onClick={() => startBooking()}>新增预约</button>} />
      <div className="appointment-cards">
        {memberBookings.map((item) => (
          <article key={item.id}>
            <div>
              <span>{item.id}</span>
              <h3>{item.service}</h3>
              <p>{item.stylist} · {item.date} {item.slot}</p>
            </div>
            <em className={`status ${item.status === '已完成' ? 'done' : item.status === '已取消' ? 'risk' : 'waiting'}`}>{item.status}</em>
            <strong>${item.price}</strong>
            {item.status === '待到店' && <button onClick={() => cancelBooking(item.id)}>取消预约</button>}
          </article>
        ))}
      </div>
    </main>
  );

  const MembershipPage = () => (
    <main className="member-web-main">
      <BackButton />
      <section className="membership-layout">
        <div className="big-member-card">
          <span>FAGE BLACK GOLD</span>
          <h1>{loggedInMember.name}</h1>
          <p>余额 ${loggedInMember.balance} · 积分 8,260 · 到店 {loggedInMember.visits} 次</p>
        </div>
        <div className="member-web-panel">
          <SectionTitle eyebrow="Coupons" title="可用优惠券" />
          {coupons.map((coupon) => (
            <div className="coupon-row" key={coupon.name}>
              <Gift size={18} />
              <div><strong>{coupon.name}</strong><span>{coupon.expires}</span></div>
              <b>{coupon.value}</b>
            </div>
          ))}
        </div>
      </section>
    </main>
  );

  const RecordsPage = () => (
    <main className="member-web-main">
      <BackButton />
      <SectionTitle eyebrow="Hair Archive" title="发型档案" />
      <div className="hair-record-grid">
        {hairRecords.map((record) => (
          <article key={record.id}>
            <img src={record.image} alt={record.title} />
            <div>
              <span>{record.date} · {record.stylist}</span>
              <h3>{record.title}</h3>
              <p>{record.formula}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );

  const ProfilePage = () => (
    <main className="member-web-main">
      <BackButton />
      <section className="profile-layout">
        <div className="profile-card">
          <div className="avatar-badge">{loggedInMember.name.slice(0, 1)}</div>
          <h1>{loggedIn ? loggedInMember.name : '游客'}</h1>
          <p>{loggedIn ? `${phone} · ${loggedInMember.level}` : '登录后查看完整会员资料'}</p>
          {!loggedIn && <button className="member-primary" onClick={() => go('login')}>立即登录</button>}
          {loggedIn && <button className="member-secondary" onClick={() => setLoggedIn(false)}>退出登录</button>}
        </div>
        <div className="member-web-panel">
          <SectionTitle eyebrow="Preferences" title="我的偏好" />
          <dl className="profile-list">
            <div><dt>指定发型师</dt><dd>{loggedInMember.stylist}</dd></div>
            <div><dt>常做项目</dt><dd>染发、护理</dd></div>
            <div><dt>生日权益</dt><dd>本月可领取护理礼</dd></div>
            <div><dt>复购提醒</dt><dd>{loggedInMember.nextAction}</dd></div>
          </dl>
        </div>
      </section>
    </main>
  );

  const pages = {
    login: <LoginPage />,
    home: <HomePage />,
    services: <ServicesPage />,
    'service-detail': <ServiceDetailPage />,
    stylists: <StylistsPage />,
    'stylist-detail': <StylistDetailPage />,
    booking: <BookingPage />,
    success: <SuccessPage />,
    appointments: <AppointmentsPage />,
    membership: <MembershipPage />,
    records: <RecordsPage />,
    profile: <ProfilePage />,
  };

  return (
    <div className="member-web">
      {page !== 'login' && <MemberNav />}
      {pages[page]}
    </div>
  );
}

export default function App() {
  const [view, setView] = useState('member');
  const [appointments, setAppointments] = useState(initialAppointments);

  const tabs = useMemo(
    () => [
      { id: 'admin', label: 'Admin 门店后台', icon: Store },
      { id: 'staff', label: '员工端', icon: UserRoundCheck },
      { id: 'member', label: '会员/顾客端', icon: HeartHandshake },
    ],
    [],
  );

  return (
    <div className="app-shell">
      <div className="demo-switcher">
        <div className="switcher-left">
          <Scissors size={18} />
          <span>发哥沙龙可定制 SaaS Demo</span>
        </div>
        <div className="switcher-tabs">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button className={view === id ? 'active' : ''} key={id} onClick={() => setView(id)}>
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>
        <button className="export-button">
          <Download size={16} />
          导出演示报表
        </button>
      </div>

      {view === 'admin' && <AdminView appointments={appointments} setAppointments={setAppointments} />}
      {view === 'staff' && <StaffView appointments={appointments} />}
      {view === 'member' && <MemberView />}
    </div>
  );
}
