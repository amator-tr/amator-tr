---
title: 'Amatör Telsizcilik Nedir? Tarihçe, Lisans, Yapılan Şeyler'
description: >-
  Amatör telsizcilik (ham radio) nedir, nasıl başlandı, ITU/IARU/TRAC ile
  düzenleniyor. Lisans sınıfları, yapılan aktiviteler (DX, contest, EmComm,
  dijital), Türkiye'de durum.
keywords:
  - başlangıç
  - lisans
  - ham-radio
  - ITU
  - TRAC
article_section: başlangıç
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: Cep telefonu varken neden amatör radyo?
    a: >-
      Cep + 4G + internet kesildiğinde (deprem, kapsama dışı, savaş) amatör
      radyo bağımsız çalışır. HF NVIS 200-500 km'lik dairede iletişim kurar.
      Dijital modlar (FT8, WinLink) -25 dB SNR'ye decode eder, çok zayıf
      sinyalde bile geçer. Hobi + sigorta gibi düşün.
  - q: Lisans pahalı mı?
    a: >-
      2026'da BTK ücreti ~250 TL/5 yıl, KEGM sınavı ücretsiz veya minimal.
      Ekipman ucuzdan pahalıya: Baofeng UV-5R 600 TL → Icom IC-7300 35K TL.
  - q: Hangi telsizle başlayayım?
    a: >-
      Quansheng UV-K5 (~1500 TL) — F4HWN custom firmware ile en esnek başlangıç.
      Veya Baofeng UV-5R (~600 TL) klasik.
  - q: CW (mors) bilmek zorunlu mu?
    a: >-
      Hayır. 2003'ten beri zorunlu değil. Ama öğrenmek istersen eğlencelidir —
      DX'te avantaj sağlar. ---
---
**Amatör telsizcilik** (İngilizce _amateur radio_ veya _ham radio_), lisanslı kişilerin radyo dalgalarını **hobi**, **eğitim**, **deney**, **kendini geliştirme** ve **acil iletişim** amacıyla kullanmasını ifade eder. Ticari kullanımdan farklıdır — kazanç değil, deneyim ve topluluk önceliklidir. Dünya çapında ~3 milyon, Türkiye'de ~10 bin aktif lisanslı amatör operatör vardır.

## Kısa tarih

Amatör radyonun başlangıcı 1900'lerin başı. Marconi'nin transatlantik kontağından (1901) sonra meraklı insanlar evlerinde alıcı/verici yapmaya başladı. ABD'de 1912 _Radio Act_ ile lisans sistemi geldi; "amateur" terimi de o dönemde profesyonel olmayan operatörleri ayırt etmek için kullanıldı. **Ham** sözcüğü ise eski telgrafçıların "kötü operatör" lakabıydı, zamanla amatörler tarafından sahiplenildi.

Türkiye'de ilk amatör telsiz dernekleri 1960'larda kuruldu. **TRAC** (Türkiye Radyo Amatörleri Cemiyeti) 1962'de kuruldu, IARU üyesidir ve ülke temsilcisidir.

## Düzenleyici çerçeve

Üç katmanlı sistem:

| Seviye | Kurum | Görev |
| --- | --- | --- |
| Uluslararası | **ITU** (Telekomünikasyon Birliği, BM) | Frekans tahsisi, dünya çapında bant planı |
| Bölgesel | **IARU** Region 1/2/3 | Amatör servis koordinasyonu, contest kuralları, bant planları |
| Ulusal (TR) | **BTK** + **KEGM** | Lisans tahsisi (BTK), sınav (KEGM), denetim |

Türkiye **IARU Region 1**'dedir (Avrupa + Ortadoğu + Afrika). Bu bölgede 2m FM çağrı frekansı 145.500 MHz, 70cm röle shift -7.6 MHz gibi standartlar geçerlidir.

## Türkiye'de lisans sınıfları

KEGM tarafından düzenlenen sınava göre 3 sınıf:

-   **A sınıfı** — tam yetki, tüm bantlar, 1500W output limit. Çağrı işareti **TA** prefiksiyle başlar.
-   **B sınıfı** — orta seviye, HF bantların büyük kısmı + tüm VHF/UHF, 250W. **TB** prefiksi. Yeni başlayanların büyük çoğunluğu B'den başlar.
-   **C sınıfı (Aday)** — başlangıç, sadece 2m + 70cm, 25W. **TC** prefiksi. 1 yıl geçerli, sonra otomatik B'ye geçilebilir.

Sınav 70/100 geçme notu, çoktan seçmeli. Konular: yönetmelik, elektrik/elektronik temel, radyo teknikleri, anten, propagasyon, operatör pratiği. [Çağrı işareti alma rehberi →](/tutorials/cagri-isareti-nasil-alinir) · [Sınav simülatörü →](/araclar/lisans-sinavi/)

Mors kodu zorunluluğu **2003'te kaldırıldı**, artık CW bilmek lisans şartı değil — ancak DX hunting'de hâlâ değerli bir yetenek.

## Amatörler ne yapar?

Çok geniş bir yelpaze:

### Sosyal / iletişim

-   **Yerel QSO** (görüşme): röleler üzerinden günlük tanıdıklarla VHF/UHF
-   **DX** (uzak ülkelerle kontak): HF bantlarda dünyanın öbür ucuyla — Japonya, Avustralya, Brezilya
-   **Contest** (yarışma): 24-48 saat boyunca maksimum kontak yapma yarışları, [DXCC](/tutorials/dxcc-dx-hunting), CQ WW, ARRL DX
-   **POTA / SOTA / IOTA** — milli park / zirve / ada aktivasyonları

### Teknik / DIY

-   **Anten yapımı** — J-Pole, dipole, EFHW, Yagi ([tutorial](/tutorials/anten-yapimi-temel))
-   **Telsiz programlama** — UV-K5, Baofeng, Anytone CHIRP ile CSV ([tutorial](/tutorials/uv-k5-programlama))
-   **NanoVNA** ile anten ölçümü ([tutorial](/tutorials/nanovna-anten-olcumu))
-   **Homebrew** projeler — kendi vericini, alıcını, hatta full transceiver yapma

### Dijital modlar

-   **FT8** — Joe Taylor'ın weak-signal modu, milyonlarca operatör kullanıyor ([tutorial](/tutorials/ft8-dijital-mod))
-   **APRS** — GPS pozisyonu + mesajlaşma, 144.800 MHz ([tutorial](/tutorials/aprs-nedir-nasil-kullanilir))
-   **DMR / D-STAR / C4FM** — dijital ses, internet köprüleri ([DMR tutorial](/tutorials/dmr-nedir-anytone-d878uv))
-   **WinLink** — radyodan e-posta, internet'siz haberleşme ([tutorial](/tutorials/winlink-email-over-radio))
-   **Echolink** — internet üzerinden ham VoIP ([tutorial](/tutorials/echolink-allstar-voip))

### Acil iletişim (EmComm)

-   AFAD koordinasyonu, deprem/sel sonrası iletişim — telefon/internet kesilince HF NVIS + VHF röle hâlâ çalışır
-   TRAC'ın AFAD ile protokolü vardır, eğitilmiş gönüllüler

### Bilim / deney

-   **Propagasyon araştırması** — WSPR ağı, sunspot etkisi
-   **Uydu kontağı** — LEO satelitleri (AO-91, RS-44 gibi), ISS APRS digi
-   **EME** (Earth-Moon-Earth) — Ay'a sinyal yansıtarak DX
-   **Meteor scatter** — meteor izlerinden VHF bouncing

## Kim amatör olabilir?

Yaş sınırı yok (Türkiye'de C sınıfı için reşit olmak gerekmiyor, veli izniyle çocuklar da alabilir). Teknik altyapı şart değil — temel elektrik bilgisi yeterli, gerisi öğrenilir. Ekipman maliyeti **600 TL'den başlar** (Baofeng UV-5R) — pahalı bir hobi olmak zorunda değil.

Yeni başlayanlar için ipucu: önce kulaklı ol — RTL-SDR ile lisanssız [bantları dinle](/tutorials/rtl-sdr-ile-telsiz-dinleme), kültürü kavra, sonra sınava hazırlan.

## Türkiye amatör topluluğu

-   **TRAC** — 1962, IARU üyesi, kurslar + contest organizasyonu + röle bakımı
-   **DRAC** (Diyarbakır), **MARTI** (Marmara), bölge dernekleri
-   **Röleler** — 150+ aktif röle Türkiye'de ([güncel CSV](/role-export/))
-   **HamNation TR** — Türkçe ham YouTube içeriği
-   **Amatör radyo Telegram grupları** — günlük konuşmalar, soru-cevap

## Sık sorulanlar

### Cep telefonu varken neden amatör radyo?

Cep + 4G + internet kesildiğinde (deprem, kapsama dışı, savaş) amatör radyo bağımsız çalışır. HF NVIS 200-500 km'lik dairede iletişim kurar. Dijital modlar (FT8, WinLink) -25 dB SNR'ye decode eder, çok zayıf sinyalde bile geçer. **Hobi + sigorta** gibi düşün.

### Lisans pahalı mı?

2026'da BTK ücreti ~250 TL/5 yıl, KEGM sınavı ücretsiz veya minimal. Ekipman ucuzdan pahalıya: Baofeng UV-5R 600 TL → Icom IC-7300 35K TL.

### Hangi telsizle başlayayım?

**[Quansheng UV-K5](/tutorials/uv-k5-programlama)** (~1500 TL) — F4HWN custom firmware ile en esnek başlangıç. Veya **[Baofeng UV-5R](/tutorials/baofeng-uv-5r-programlama)** (~600 TL) klasik.

### CW (mors) bilmek zorunlu mu?

Hayır. 2003'ten beri zorunlu değil. Ama [öğrenmek istersen](/tutorials/mors-kodu-ogrenme) eğlencelidir — DX'te avantaj sağlar.

* * *

## İlgili kaynaklar

-   [Çağrı işareti nasıl alınır](/tutorials/cagri-isareti-nasil-alinir) — BTK / KEGM lisans süreci adım adım
-   [Lisans sınavı simülatörü](/araclar/lisans-sinavi/) — 661 örnek soru, A-B + C sınıfı
-   [Sözlük](/sozluk) — 80+ amatör telsiz terimi
-   [İlk QSO](/tutorials/role-nedir) — röle nedir, nasıl kullanılır
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — Türkçe amatör telsiz makaleleri arşivi
