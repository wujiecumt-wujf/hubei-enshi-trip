import { useEffect, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  AlertTriangle,
  BedDouble,
  CalendarDays,
  Check,
  CircleAlert,
  ExternalLink,
  Hotel,
  Luggage,
  MapPin,
  NotebookPen,
  Phone,
  Plane,
  RefreshCcw,
  Route,
  ShieldAlert,
  TicketCheck,
  TrainFront,
  Umbrella,
} from 'lucide-react'
import './Trip.css'
import {
  bookingItems,
  contingencies,
  fobaoshanGate,
  hotels,
  packingGroups,
  tripDays,
  type BookingCategory,
} from './data/tripData'

type TabId = 'plan' | 'bookings' | 'backup' | 'packing'
type BookingFilter = '全部' | BookingCategory
type BookingState = Record<string, { booked: boolean; confirmed: boolean }>
type BooleanState = Record<string, boolean>
type NoteState = Record<string, string>

const navItems: Array<{ id: TabId; label: string; icon: LucideIcon }> = [
  { id: 'plan', label: '行程', icon: CalendarDays },
  { id: 'bookings', label: '预订', icon: TicketCheck },
  { id: 'backup', label: '应变', icon: ShieldAlert },
  { id: 'packing', label: '行李', icon: Luggage },
]

const bookingFilters: BookingFilter[] = ['全部', '交通', '住宿', '门票']

function usePersistentState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue = window.localStorage.getItem(key)
      return storedValue ? (JSON.parse(storedValue) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // The app remains usable when storage is unavailable.
    }
  }, [key, value])

  return [value, setValue] as const
}

function dateAtMidnight(value: string) {
  return new Date(`${value}T00:00:00`)
}

function getTodayAtMidnight() {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

function getInitialDayId() {
  const today = getTodayAtMidnight()
  const matchingDay = tripDays.find(
    (day) => dateAtMidnight(day.isoDate).getTime() === today.getTime(),
  )

  if (matchingDay) return matchingDay.id
  if (today < dateAtMidnight(tripDays[0].isoDate)) return tripDays[0].id
  return tripDays[tripDays.length - 1].id
}

function getTripStatus() {
  const today = getTodayAtMidnight()
  const start = dateAtMidnight(tripDays[0].isoDate)
  const end = dateAtMidnight(tripDays[tripDays.length - 1].isoDate)
  const millisecondsPerDay = 24 * 60 * 60 * 1000

  if (today < start) {
    return `距出发 ${Math.ceil((start.getTime() - today.getTime()) / millisecondsPerDay)} 天`
  }

  if (today > end) return '行程已结束'

  const dayNumber =
    Math.floor((today.getTime() - start.getTime()) / millisecondsPerDay) + 1
  return `旅程第 ${dayNumber} 天`
}

function TripApp() {
  const [activeTab, setActiveTab] = useState<TabId>('plan')
  const [activeDayId, setActiveDayId] = useState(getInitialDayId)
  const [bookingFilter, setBookingFilter] = useState<BookingFilter>('全部')
  const [bookingState, setBookingState] = usePersistentState<BookingState>(
    'hubei-trip-bookings-v1',
    {},
  )
  const [packingState, setPackingState] = usePersistentState<BooleanState>(
    'hubei-trip-packing-v1',
    {},
  )
  const [gateState, setGateState] = usePersistentState<BooleanState>(
    'hubei-trip-fobaoshan-gate-v1',
    {},
  )
  const [notes, setNotes] = usePersistentState<NoteState>(
    'hubei-trip-notes-v1',
    {},
  )

  const activeDay =
    tripDays.find((day) => day.id === activeDayId) ?? tripDays[0]
  const activeHotel = hotels.find((hotel) => hotel.id === activeDay.hotelId)
  const activeContingencies = contingencies.filter(
    (plan) => plan.dayId === activeDayId,
  )
  const visibleBookings =
    bookingFilter === '全部'
      ? bookingItems
      : bookingItems.filter((item) => item.category === bookingFilter)
  const bookedCount = bookingItems.filter(
    (item) => bookingState[item.id]?.booked,
  ).length
  const confirmedCount = bookingItems.filter(
    (item) => bookingState[item.id]?.confirmed,
  ).length
  const packingItems = packingGroups.flatMap((group) => group.items)
  const packedCount = packingItems.filter((item) => packingState[item.id]).length
  const gateReady = fobaoshanGate.every((condition) => gateState[condition.id])

  function setBookingFlag(
    id: string,
    field: 'booked' | 'confirmed',
    checked: boolean,
  ) {
    setBookingState((current) => ({
      ...current,
      [id]: {
        booked: current[id]?.booked ?? false,
        confirmed: current[id]?.confirmed ?? false,
        [field]: checked,
      },
    }))
  }

  function resetBookings() {
    if (window.confirm('确定要清空全部预订和复核勾选吗？')) {
      setBookingState({})
    }
  }

  function resetPacking() {
    if (window.confirm('确定要清空全部行李勾选吗？')) {
      setPackingState({})
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-block">
          <span className="brand-mark" aria-hidden="true">鄂</span>
          <div>
            <strong>恩施五日</strong>
            <span>2026.08.05—08.09</span>
          </div>
        </div>
        <div className="trip-status" aria-label="行程状态">
          <span className="status-dot" />
          {getTripStatus()}
        </div>
      </header>

      {(activeTab === 'plan' || activeTab === 'backup') && (
        <>
          <section className="journey-hero" aria-labelledby="day-title">
            <img src={activeDay.image} alt={activeDay.imageAlt} />
            <div className="hero-scrim" />
            <div className="hero-content">
              <span className="hero-day">
                D{activeDay.dayNumber} · {activeDay.dateLabel} {activeDay.weekday}
              </span>
              <h1 id="day-title">{activeDay.title}</h1>
              <p>{activeDay.summary}</p>
              <div className="hero-route">
                <Route size={17} aria-hidden="true" />
                <span>{activeDay.route}</span>
              </div>
            </div>
            <span className="image-credit">图源：{activeDay.imageCredit}</span>
          </section>

          <nav className="date-rail" aria-label="选择行程日期">
            {tripDays.map((day) => (
              <button
                type="button"
                key={day.id}
                className={day.id === activeDayId ? 'is-active' : ''}
                onClick={() => setActiveDayId(day.id)}
                aria-current={day.id === activeDayId ? 'date' : undefined}
              >
                <span>D{day.dayNumber}</span>
                <strong>{day.shortDate}</strong>
                <small>{day.weekday}</small>
              </button>
            ))}
          </nav>
        </>
      )}

      <main className="main-content">
        {activeTab === 'plan' && (
          <>
            <section className="section-heading">
              <div>
                <span className="section-kicker">当日安排</span>
                <h2>按这个节奏走</h2>
              </div>
              <span className="section-count">{activeDay.schedule.length} 段</span>
            </section>

            <section className="timeline" aria-label={`${activeDay.dateLabel}时间线`}>
              {activeDay.schedule.map((item) => (
                <article className="timeline-item" key={`${item.time}-${item.title}`}>
                  <div className="timeline-time">{item.time}</div>
                  <div className="timeline-pin" aria-hidden="true" />
                  <div className="timeline-copy">
                    <div className="timeline-title-row">
                      <h3>{item.title}</h3>
                      {item.tag && <span>{item.tag}</span>}
                    </div>
                    <p>{item.detail}</p>
                  </div>
                </article>
              ))}
            </section>

            <section className="notice-panel" aria-labelledby="attention-title">
              <div className="notice-heading">
                <AlertTriangle size={20} aria-hidden="true" />
                <h2 id="attention-title">当天注意</h2>
              </div>
              <ul>
                {activeDay.warnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
              {activeDay.phone && (
                <a
                  className="text-action"
                  href={`tel:${activeDay.phone.number.replaceAll('-', '')}`}
                >
                  <Phone size={17} aria-hidden="true" />
                  {activeDay.phone.label} {activeDay.phone.number}
                </a>
              )}
            </section>

            {activeHotel && (
              <section className="hotel-panel" aria-labelledby="hotel-title">
                <div className="panel-icon" aria-hidden="true">
                  <BedDouble size={22} />
                </div>
                <div className="hotel-copy">
                  <span>{activeHotel.date} · {activeHotel.city}住宿</span>
                  <h2 id="hotel-title">{activeHotel.name}</h2>
                  <p className="hotel-address">
                    <MapPin size={15} aria-hidden="true" />
                    {activeHotel.address}
                  </p>
                  <strong>{activeHotel.price}</strong>
                  <p>{activeHotel.note}</p>
                </div>
                <a
                  className="square-action"
                  href={activeHotel.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`查看${activeHotel.name}`}
                  title="查看酒店"
                >
                  <ExternalLink size={19} aria-hidden="true" />
                </a>
              </section>
            )}

            {activeDay.detailImage && (
              <figure className="destination-photo">
                <img src={activeDay.detailImage} alt={activeDay.detailImageAlt} />
                <figcaption>{activeDay.detailImageAlt}</figcaption>
              </figure>
            )}

            <section className="notes-panel" aria-labelledby="notes-title">
              <div className="notes-title">
                <NotebookPen size={19} aria-hidden="true" />
                <h2 id="notes-title">我的补充</h2>
              </div>
              <textarea
                value={notes[activeDay.id] ?? ''}
                onChange={(event) =>
                  setNotes((current) => ({
                    ...current,
                    [activeDay.id]: event.target.value,
                  }))
                }
                placeholder="集合点、同行人、订单号或临时变化"
                rows={3}
              />
            </section>
          </>
        )}

        {activeTab === 'bookings' && (
          <>
            <section className="page-intro">
              <div className="intro-title-row">
                <div>
                  <span className="section-kicker">预订总表</span>
                  <h1>票、房与48小时复核</h1>
                </div>
                <button
                  type="button"
                  className="icon-button"
                  onClick={resetBookings}
                  aria-label="重置预订勾选"
                  title="重置预订勾选"
                >
                  <RefreshCcw size={19} aria-hidden="true" />
                </button>
              </div>
              <div className="progress-summary">
                <div><strong>{bookedCount}/{bookingItems.length}</strong><span>已预订或落实</span></div>
                <div><strong>{confirmedCount}/{bookingItems.length}</strong><span>已复核</span></div>
              </div>
              <div
                className="progress-track"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={bookingItems.length}
                aria-valuenow={bookedCount}
              >
                <span style={{ width: `${(bookedCount / bookingItems.length) * 100}%` }} />
              </div>
            </section>

            <div className="segmented-control" role="group" aria-label="筛选预订类型">
              {bookingFilters.map((filter) => (
                <button
                  type="button"
                  key={filter}
                  className={bookingFilter === filter ? 'is-active' : ''}
                  onClick={() => setBookingFilter(filter)}
                  aria-pressed={bookingFilter === filter}
                >
                  {filter}
                </button>
              ))}
            </div>

            <section className="booking-list" aria-label="预订项目">
              {visibleBookings.map((item) => {
                const state = bookingState[item.id] ?? { booked: false, confirmed: false }
                const CategoryIcon = item.category === '交通'
                  ? item.title.startsWith('JD') ? Plane : TrainFront
                  : item.category === '住宿' ? Hotel : TicketCheck

                return (
                  <article
                    className={`booking-card ${state.booked && state.confirmed ? 'is-complete' : ''}`}
                    key={item.id}
                  >
                    <div className="booking-card-top">
                      <div className={`category-icon category-${item.category}`}>
                        <CategoryIcon size={19} aria-hidden="true" />
                      </div>
                      <div className="booking-copy">
                        <span>{item.date} · {item.category}</span>
                        <h2>{item.title}</h2>
                        <p>{item.detail}</p>
                      </div>
                      {(item.url || item.phone) && (
                        <a
                          className="square-action"
                          href={item.url ?? `tel:${item.phone?.replaceAll('-', '')}`}
                          target={item.url ? '_blank' : undefined}
                          rel={item.url ? 'noreferrer' : undefined}
                          aria-label={item.actionLabel ?? `拨打${item.phone ?? '景区电话'}`}
                          title={item.actionLabel ?? '拨打景区'}
                        >
                          {item.url ? <ExternalLink size={18} /> : <Phone size={18} />}
                        </a>
                      )}
                    </div>
                    <div className="booking-checks">
                      <label>
                        <input
                          type="checkbox"
                          checked={state.booked}
                          onChange={(event) => setBookingFlag(item.id, 'booked', event.target.checked)}
                        />
                        <span>{item.primaryLabel}</span>
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={state.confirmed}
                          onChange={(event) => setBookingFlag(item.id, 'confirmed', event.target.checked)}
                        />
                        <span>{item.confirmLabel}</span>
                      </label>
                    </div>
                  </article>
                )
              })}
            </section>

            <aside className="reference-note">
              <CircleAlert size={18} aria-hidden="true" />
              <p>参考时刻、价格和旧截图都不是订单凭证；付款页与最终订单优先。</p>
            </aside>
          </>
        )}

        {activeTab === 'backup' && (
          <>
            <section className="section-heading backup-heading">
              <div>
                <span className="section-kicker">D{activeDay.dayNumber} 应变</span>
                <h2>不能按原计划时</h2>
              </div>
              <Umbrella size={23} aria-hidden="true" />
            </section>

            {activeDayId === 'day-3' && (
              <section
                className={`decision-gate ${gateReady ? 'is-ready' : 'is-blocked'}`}
                aria-labelledby="gate-title"
              >
                <div className="gate-result">
                  {gateReady ? <Check size={22} /> : <ShieldAlert size={22} />}
                  <div>
                    <span>佛宝山执行闸门</span>
                    <h2 id="gate-title">{gateReady ? '四项齐全，可以执行' : '条件未齐，不要出发'}</h2>
                  </div>
                </div>
                <div className="gate-checks">
                  {fobaoshanGate.map((condition) => (
                    <label key={condition.id}>
                      <input
                        type="checkbox"
                        checked={gateState[condition.id] ?? false}
                        onChange={(event) =>
                          setGateState((current) => ({ ...current, [condition.id]: event.target.checked }))
                        }
                      />
                      <span>{condition.label}</span>
                    </label>
                  ))}
                </div>
              </section>
            )}

            <section className="contingency-list" aria-label="备选方案">
              {activeContingencies.map((plan) => (
                <article className="contingency-card" key={plan.id}>
                  <div className="contingency-title">
                    <AlertTriangle size={20} aria-hidden="true" />
                    <div>
                      <span>触发条件</span>
                      <h2>{plan.title}</h2>
                    </div>
                  </div>
                  <p className="trigger-copy">{plan.trigger}</p>
                  <div className="option-list">
                    {plan.options.map((option, index) => (
                      <div className="option-row" key={option.label}>
                        <span className="option-number">{index + 1}</span>
                        <div>
                          <h3>{option.label}</h3>
                          <p>{option.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {plan.phone && (
                    <a className="text-action" href={`tel:${plan.phone.replaceAll('-', '')}`}>
                      <Phone size={17} aria-hidden="true" />
                      先电话确认 {plan.phone}
                    </a>
                  )}
                </article>
              ))}
            </section>

            <section className="principles-panel" aria-labelledby="principles-title">
              <div className="notice-heading">
                <ShieldAlert size={20} aria-hidden="true" />
                <h2 id="principles-title">全程底线</h2>
              </div>
              <ol>
                <li>服从停航、停漂和地质风险管控，不从非正规入口进入。</li>
                <li>先保人员安全与下一段交通，再考虑补景点。</li>
                <li>山路接驳必须在前一日向车站、司机或景区复核。</li>
                <li>不可退票和不可退包车只在关键条件全部确认后付款。</li>
              </ol>
            </section>
          </>
        )}

        {activeTab === 'packing' && (
          <>
            <section className="page-intro">
              <div className="intro-title-row">
                <div>
                  <span className="section-kicker">全程装备</span>
                  <h1>出发前装进行李</h1>
                </div>
                <button
                  type="button"
                  className="icon-button"
                  onClick={resetPacking}
                  aria-label="重置行李勾选"
                  title="重置行李勾选"
                >
                  <RefreshCcw size={19} aria-hidden="true" />
                </button>
              </div>
              <div className="packing-progress-copy">
                <strong>{packedCount}/{packingItems.length}</strong>
                <span>已装好</span>
              </div>
              <div
                className="progress-track"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={packingItems.length}
                aria-valuenow={packedCount}
              >
                <span style={{ width: `${(packedCount / packingItems.length) * 100}%` }} />
              </div>
            </section>

            <section className="packing-groups" aria-label="行李清单">
              {packingGroups.map((group) => (
                <article className="packing-group" key={group.id}>
                  <div>
                    <h2>{group.title}</h2>
                    <p>{group.description}</p>
                  </div>
                  <div className="packing-checks">
                    {group.items.map((item) => (
                      <label key={item.id}>
                        <input
                          type="checkbox"
                          checked={packingState[item.id] ?? false}
                          onChange={(event) =>
                            setPackingState((current) => ({ ...current, [item.id]: event.target.checked }))
                          }
                        />
                        <span className="packing-box" aria-hidden="true"><Check size={15} /></span>
                        <span>{item.label}</span>
                      </label>
                    ))}
                  </div>
                </article>
              ))}
            </section>
          </>
        )}
      </main>

      <footer className="source-footer">
        内容整理自《湖北5日游攻略-合并版-住宿更新》。动态信息以最终订单、12306和景区当日公告为准。
      </footer>

      <nav className="bottom-nav" aria-label="应用主导航">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              type="button"
              key={item.id}
              className={activeTab === item.id ? 'is-active' : ''}
              onClick={() => {
                setActiveTab(item.id)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              aria-current={activeTab === item.id ? 'page' : undefined}
            >
              <Icon size={21} strokeWidth={2} aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}

export default TripApp