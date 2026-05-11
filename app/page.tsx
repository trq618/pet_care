"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

const heroSlides = [
  "/assets/pet-spa-hero.png",
  "/assets/pet-spa-hero-dog.png",
  "/assets/pet-spa-hero-cat.png",
];

const testimonials = [
  {
    name: "陈女士",
    pet: "柯基 豆包",
    text: "豆包平时很怕吹风，这次美容师一直慢慢安抚，还把耳朵和脚底毛处理得很干净。接回家以后毛很蓬松，也没有紧张到发抖。",
    tag: "深层蓬松护理",
  },
  {
    name: "周先生",
    pet: "布偶猫 奶盖",
    text: "第一次带猫咪来洗护，本来担心会应激。店里会提前确认习惯，过程中也发照片同步，回家后猫咪状态很放松。",
    tag: "猫咪低敏洗护",
  },
  {
    name: "林女士",
    pet: "比熊 小雪",
    text: "造型修得很自然，没有剪得过短，脸型也保留了小雪原来的可爱感。美容师还教了日常梳毛的位置和频率。",
    tag: "精修造型",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [minDate, setMinDate] = useState("");
  const toastTimerRef = useRef<number | null>(null);

  const normalizedSlide = useMemo(
    () => ((currentSlide % heroSlides.length) + heroSlides.length) % heroSlides.length,
    [currentSlide],
  );

  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    setMinDate(today.toISOString().slice(0, 10));
  }, []);

  useEffect(() => {
    const carouselTimer = window.setInterval(() => {
      setCurrentSlide((slide) => slide + 1);
    }, 5200);

    return () => window.clearInterval(carouselTimer);
  }, [normalizedSlide]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  function goToSlide(index: number) {
    setCurrentSlide(index);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowToast(true);
    event.currentTarget.reset();

    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = window.setTimeout(() => {
      setShowToast(false);
    }, 3200);
  }

  return (
    <>
      <header className="topbar" aria-label="页面导航">
        <a className="brand" href="#top" aria-label="毛球护理所首页">
          <span className="brand-mark">M</span>
          <span>毛球护理所</span>
        </a>
        <nav className="nav" aria-label="主导航">
          <a href="#services">服务</a>
          <a href="#process">流程</a>
          <a href="#testimonials">评价</a>
          <a href="#booking">预约</a>
          <a href="#location">到店</a>
        </nav>
        <a className="nav-cta" href="#booking">
          立即预约
        </a>
      </header>

      <main id="top">
        <section className="hero" aria-label="毛球护理所宠物洗护美容">
          <div className="hero-carousel" aria-hidden="true">
            {heroSlides.map((slide, index) => (
              <img
                className={`hero-slide${index === normalizedSlide ? " active" : ""}`}
                src={slide}
                alt=""
                key={slide}
              />
            ))}
          </div>
          <button
            className="hero-control hero-control-prev"
            type="button"
            aria-label="上一张轮播图"
            onClick={() => goToSlide(normalizedSlide - 1)}
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            className="hero-control hero-control-next"
            type="button"
            aria-label="下一张轮播图"
            onClick={() => goToSlide(normalizedSlide + 1)}
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
          <div className="hero-inner">
            <div className="hero-content">
              <p className="eyebrow">预约制宠物洗护美容</p>
              <h1>把每次洗澡变成安心护理</h1>
              <p className="hero-lede">
                从皮毛评估、低敏清洁到造型修剪，给猫狗一套安静、干净、有耐心的洗护体验。
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#booking">
                  预约本周档期
                </a>
                <a className="button button-secondary" href="#services">
                  查看服务价格
                </a>
              </div>
              <div className="hero-stats" aria-label="门店亮点">
                <div className="stat">
                  <strong>1 对 1</strong>
                  <span>专属美容师照看</span>
                </div>
                <div className="stat">
                  <strong>低敏</strong>
                  <span>按皮毛状态选品</span>
                </div>
                <div className="stat">
                  <strong>可视</strong>
                  <span>洗护进度同步</span>
                </div>
              </div>
            </div>
            <div className="hero-dots" aria-label="轮播图切换">
              {heroSlides.map((slide, index) => (
                <button
                  className={`hero-dot${index === normalizedSlide ? " active" : ""}`}
                  type="button"
                  aria-label={`查看第 ${index + 1} 张轮播图`}
                  aria-current={index === normalizedSlide ? "true" : "false"}
                  onClick={() => goToSlide(index)}
                  key={slide}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="services">
          <div className="section-inner">
            <div className="section-head">
              <div>
                <p className="section-kicker">Services</p>
                <h2>常用洗护套餐</h2>
              </div>
              <p className="section-note">价格会根据体型、毛量、打结程度微调，到店前可先发照片估价。</p>
            </div>

            <div className="service-grid">
              <article className="card service-card">
                <div className="service-icon">B</div>
                <h3>基础洁净浴</h3>
                <p>适合日常清洁、轻微异味和短毛犬猫。</p>
                <ul className="service-list">
                  <li>皮毛检查与低敏沐浴</li>
                  <li>耳道清洁、指甲修剪</li>
                  <li>吹干梳顺与基础护理</li>
                </ul>
                <div className="price">
                  <strong>¥98 起</strong>
                  <span>约 60-90 分钟</span>
                </div>
              </article>

              <article className="card service-card">
                <div className="service-icon">S</div>
                <h3>深层蓬松护理</h3>
                <p>针对长毛、换毛季、毛发扁塌和轻度打结。</p>
                <ul className="service-list">
                  <li>死毛梳理与毛结预处理</li>
                  <li>护毛素护理与蓬松吹整</li>
                  <li>护理前后照片反馈</li>
                </ul>
                <div className="price">
                  <strong>¥168 起</strong>
                  <span>约 90-150 分钟</span>
                </div>
              </article>

              <article className="card service-card">
                <div className="service-icon">G</div>
                <h3>精修造型</h3>
                <p>适合泰迪、比熊、雪纳瑞等需要定期造型的宠物。</p>
                <ul className="service-list">
                  <li>脸型、脚型、身体线条修剪</li>
                  <li>肛门腺、脚底毛、腹底毛处理</li>
                  <li>按生活习惯定制造型</li>
                </ul>
                <div className="price">
                  <strong>¥338 起</strong>
                  <span>约 2-3 小时</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section care-band" id="process">
          <div className="section-inner process">
            <div className="photo-panel">
              <img src="/assets/pet-spa-hero.png" alt="宠物美容师在干净明亮的护理空间中照看小狗" />
              <div className="photo-badge">
                <strong>不赶时间的护理</strong>
                <span>胆小、敏感、第一次洗护的宠物会预留安抚时间。</span>
              </div>
            </div>

            <div>
              <p className="section-kicker">Care Flow</p>
              <h2>每一步都先看宠物状态</h2>
              <div className="steps">
                <article className="step">
                  <div>
                    <h3>到店评估</h3>
                    <p>确认皮肤、毛结、耳道和情绪状态，提前说明可能的加时与护理建议。</p>
                  </div>
                </article>
                <article className="step">
                  <div>
                    <h3>分区清洁</h3>
                    <p>按脸部、身体、脚底、尾部逐区处理，避开眼鼻，减少应激。</p>
                  </div>
                </article>
                <article className="step">
                  <div>
                    <h3>吹整修护</h3>
                    <p>低噪吹水与梳毛同步进行，长毛宠物会重点处理底层湿气。</p>
                  </div>
                </article>
                <article className="step">
                  <div>
                    <h3>交接反馈</h3>
                    <p>告知本次发现的问题、居家梳毛频率和下次护理建议。</p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="section testimonials-section" id="testimonials">
          <div className="section-inner">
            <div className="section-head">
              <div>
                <p className="section-kicker">Reviews</p>
                <h2>客户带着安心感回家</h2>
              </div>
              <p className="section-note">来自近期到店客户的真实体验反馈，覆盖狗狗洗护、猫咪护理和精修造型。</p>
            </div>

            <div className="testimonial-grid">
              {testimonials.map((testimonial) => (
                <article className="card testimonial-card" key={testimonial.name}>
                  <div className="testimonial-rating" aria-label="五星评价">
                    ★★★★★
                  </div>
                  <blockquote>“{testimonial.text}”</blockquote>
                  <div className="testimonial-footer">
                    <div>
                      <strong>{testimonial.name}</strong>
                      <span>{testimonial.pet}</span>
                    </div>
                    <span className="testimonial-tag">{testimonial.tag}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="booking">
          <div className="section-inner booking-wrap">
            <aside className="info-block" id="location">
              <p className="section-kicker">Visit</p>
              <h2>门店信息</h2>
              <div className="info-row">
                <strong>地址</strong>
                <span>上海市静安区青云路 88 号 1F</span>
              </div>
              <div className="store-map" aria-label="上海市静安区青云路 88 号 1F 地图">
                <iframe
                  title="毛球护理所门店地图"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=121.4663%2C31.2595%2C121.4807%2C31.2689&layer=mapnik&marker=31.2642%2C121.4735"
                />
                <a
                  className="map-link"
                  href="https://uri.amap.com/search?keyword=%E4%B8%8A%E6%B5%B7%E5%B8%82%E9%9D%99%E5%AE%89%E5%8C%BA%E9%9D%92%E4%BA%91%E8%B7%AF88%E5%8F%B7"
                  target="_blank"
                  rel="noopener"
                >
                  打开地图导航
                </a>
              </div>
              <div className="info-row">
                <strong>营业</strong>
                <span>周二至周日 10:00-20:00，周一店休消毒</span>
              </div>
              <div className="info-row">
                <strong>电话</strong>
                <span>021-6800-8899</span>
              </div>
              <div className="info-row">
                <strong>提示</strong>
                <span>建议提前 1 天预约；大型犬与猫咪洗护请先电话确认档期。</span>
              </div>
            </aside>

            <section className="card booking" aria-label="预约表单">
              <h2>预约洗护</h2>
              <p>提交后会在营业时间内回电确认具体档期。</p>
              <form id="bookingForm" onSubmit={handleSubmit}>
                <div className="field-grid">
                  <label>
                    您的称呼
                    <input name="name" type="text" placeholder="例如：陈女士" required />
                  </label>
                  <label>
                    联系电话
                    <input name="phone" type="tel" placeholder="用于确认预约" required />
                  </label>
                </div>
                <div className="field-grid">
                  <label>
                    宠物类型
                    <select name="pet" required defaultValue="">
                      <option value="">请选择</option>
                      <option>小型犬</option>
                      <option>中大型犬</option>
                      <option>猫咪</option>
                      <option>其他小宠</option>
                    </select>
                  </label>
                  <label>
                    预约服务
                    <select name="service" required defaultValue="">
                      <option value="">请选择</option>
                      <option>基础洁净浴</option>
                      <option>深层蓬松护理</option>
                      <option>精修造型</option>
                      <option>先咨询再决定</option>
                    </select>
                  </label>
                </div>
                <div className="field-grid">
                  <label>
                    希望日期
                    <input name="date" type="date" min={minDate} required />
                  </label>
                  <label>
                    希望时段
                    <select name="time" required defaultValue="">
                      <option value="">请选择</option>
                      <option>10:00-12:00</option>
                      <option>12:00-15:00</option>
                      <option>15:00-18:00</option>
                      <option>18:00-20:00</option>
                    </select>
                  </label>
                </div>
                <label>
                  宠物情况
                  <textarea name="note" placeholder="可以写体重、毛量、是否打结、是否怕生等" />
                </label>
                <div className="form-footer">
                  <p className="form-hint">当前为演示表单，不会真实发送。</p>
                  <button className="button button-primary" type="submit">
                    提交预约
                  </button>
                </div>
              </form>
            </section>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-inner">
          <span>© 2026 毛球护理所 Pet Grooming Studio</span>
          <a className="mini-link" href="#top">
            回到顶部
          </a>
        </div>
      </footer>

      <div className={`toast${showToast ? " show" : ""}`} role="status" aria-live="polite">
        预约信息已记录，门店会尽快与您确认。
      </div>
    </>
  );
}
