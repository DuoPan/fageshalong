import React, { useMemo, useState } from 'react';
import {
  BadgeCheck,
  Bell,
  CalendarClock,
  ChartNoAxesCombined,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  CreditCard,
  Crown,
  Download,
  Gem,
  HandCoins,
  HeartHandshake,
  LayoutDashboard,
  MessageCircle,
  PackageCheck,
  PanelLeft,
  QrCode,
  ReceiptText,
  Scissors,
  Search,
  Sparkles,
  Star,
  Store,
  UserRoundCheck,
  UsersRound,
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
  const [service, setService] = useState(services[1]);
  const [stylist, setStylist] = useState(stylists[1]);
  const [slot, setSlot] = useState('14:30');

  const slots = ['10:30', '11:15', '13:00', '14:30', '15:45', '17:00'];

  return (
    <div className="phone-stage member-stage">
      <div className="phone-shell member-phone">
        <section className="member-hero">
          <div className="member-hero-overlay">
            <Logo />
            <h1>{brand.name}</h1>
            <p>{brand.address} · {brand.hours}</p>
            <div className="queue-card">
              <span>当前排队</span>
              <strong>前方 3 人</strong>
              <em>预计等待 18 分钟</em>
            </div>
          </div>
        </section>
        <section className="mobile-card">
          <SectionTitle eyebrow="Services" title="选择服务项目" />
          <div className="service-carousel">
            {services.map((item) => (
              <button
                className={service.id === item.id ? 'active' : ''}
                key={item.id}
                onClick={() => setService(item)}
              >
                <img src={item.image} alt={item.name} />
                <strong>{item.name}</strong>
                <span>${item.price} · {item.duration} 分钟</span>
              </button>
            ))}
          </div>
        </section>
        <section className="mobile-card">
          <SectionTitle eyebrow="Stylists" title="选择熟手发型师" />
          <div className="stylist-picks">
            {stylists.slice(0, 3).map((item) => (
              <button
                className={stylist.id === item.id ? 'active' : ''}
                key={item.id}
                onClick={() => setStylist(item)}
              >
                <img src={item.avatar} alt={item.name} />
                <div>
                  <strong>{item.name}</strong>
                  <span><Star size={13} /> {item.rating} · {item.bookings} 次预约</span>
                </div>
              </button>
            ))}
          </div>
        </section>
        <section className="mobile-card">
          <SectionTitle eyebrow="Booking" title="选择预约时段" />
          <div className="slot-grid">
            {slots.map((item) => (
              <button className={slot === item ? 'active' : ''} key={item} onClick={() => setSlot(item)}>
                {item}
              </button>
            ))}
          </div>
          <div className="booking-summary">
            <BadgeCheck size={19} />
            <div>
              <strong>{service.name} · {stylist.name}</strong>
              <span>今天 {slot}，到店前 30 分钟微信提醒</span>
            </div>
          </div>
          <button className="primary-button full">确认预约</button>
        </section>
        <section className="member-card">
          <div>
            <span>电子会员卡</span>
            <strong>黑金会员 · 余额 $1,280</strong>
          </div>
          <ChevronRight size={20} />
        </section>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState('admin');
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
