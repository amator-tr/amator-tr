---
title: SWL (Short-Wave Listener) — Lisanssız Dinleyici Kültürü
description: >-
  Short-Wave Listener (SWL) nedir, lisanssız amatör radyo dinleme. SINPO
  raporlama, SWL log, eQSL kart, RTL-SDR ile başlangıç, hangi bantlarda ne
  dinlenir.
keywords:
  - SWL
  - dinleyici
  - RTL-SDR
  - broadcast
  - başlangıç
article_section: SWL
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: Lisans olmadan dinlemek yasal mı?
    a: >-
      Evet — Türkiye yasası amatör bantlarda dinleme serbest. Sadece TX lisans
      şartı.
  - q: Şifreli sinyalleri decode edebilir miyim?
    a: >-
      - Amatör bandlarda şifre yok (yasak) - Cellular GSM/LTE → şifreli, decode
      yasal sorun - Diplomatic / military → şifreli, decode yasal sorun - Genel
      kural: dinleyebilirsin ama decode etmek yasal gri alan
  - q: En kolay başlangıç?
    a: >-
      1. RTL-SDR ($30) + bilgisayar 2. SDR# yazılımı kur (ücretsiz) 3. 5m tel
      anten balkon 4. 7.150 MHz LSB → Avrupa amatör SSB 15 dakikada ilk dinleme.
  - q: Free band" pirate radio dinlenebilir mi?
    a: >-
      - Pirate radio dinleme yasal - Ama o frekansta TX yapma (lisans dışı) -
      Pratikte SWL → uzaktan kalma + kayıt
  - q: SWL log gönderme zorunlu mu?
    a: >-
      Hayır — sadece kişisel hobi. eQSL kart sadece istersen — operatöre rapor
      gönder, isteğe bağlı. ---
---
Lisansın yok, ama amatör radyo dünyasını **dinleyebilirsin** — Türkiye'de yasal, eğitsel, eğlenceli. **SWL = Short-Wave Listener** = kısa dalga dinleyicisi. RTL-SDR ile başlayıp dünya çapındaki istasyonlardan kontak duy, raporla, eQSL kartı al. Bu rehber SWL'in nasıl yapılır + kültürü + lisansa hazırlık aracı olması.

## SWL nedir?

**Short-Wave Listener** — kısa dalga (HF) bandlarını dinleyen amatör. Lisans **gerek yok** — sadece dinliyorsun, vermiyorsun.

### Tarih

-   1920'lerde başladı — radio amatörler ilk kontak yapmaya başladığında dinleyicileri vardı
-   WW2 sonrası uluslararası broadcast (BBC, VOA, Radio Moscow) ile zirveye
-   Internet öncesi dünya haberleri dinleme = SWL ana
-   1990'lar internet patlamasıyla niche'a indi
-   2010+ RTL-SDR ucuzladıkça nostaljik geri dönüş

### SWL kimdir?

-   **Hobi** olarak dinleme
-   **Lisans alma yolu** — sınava hazırlanan ön deneyim
-   **Eğlence** — uzak ülkelerin radyolarını dinleme
-   **Eğitim** — RF / propagasyon / dijital mod öğrenme

### Analitik dinleme — "pasif" değil

SWL sadece "kulaklığı tak, dinle" değil. Profesyonel bir SWL sadece sesi duymaz — o sesin **hangi atmosferik katmanlardan geçtiğini**, neden sönümlendiğini (fading), karşıdaki operatörün neden belirli bir ses tonuyla konuştuğunu **analiz eder**. Dinleme süreci operatörlük yetkinliğinin temelidir — modülasyon tiplerini tanımak, parazit kaynaklarını ayırt etmek, uluslararası protokolleri içselleştirmek. Mandala basmadan önce **kulağını eğitirsen**, ilk TX'in çok daha profesyonel olur.

## Ne dinlersin?

### Amatör radyo

-   HF SSB QSO'lar (14.245 USB, 7.150 LSB, vs)
-   VHF FM röleler (145.500-145.800)
-   Dijital modlar (FT8 14.074, JS8 14.078)
-   Contest sırasında sürü kontak

### Broadcast (uluslararası)

-   **TRT World Radio** (TR resmi, internet üzerinden artık)
-   **BBC World Service** (eski HF, modern internet)
-   **Voice of America** (VOA)
-   **Deutsche Welle** (DW)
-   **Radio Romania International**

### Numbers stations

-   **Garip codes / numbers yayını**
-   Soğuk savaş gizli ajan iletişim — bazıları hâlâ aktif (UVB-76 The Buzzer, vs)
-   Mistik / merak konusu

### Maritime / aviation

-   VHF Channel 16 (156.8 MHz) maritime distress
-   HF maritime (4-22 MHz)
-   VHF aviation (118-137 MHz AM) — uçaklar + control kuleleri

### Specialty

-   **Pirate radio** — yasadışı broadcaster (Avrupa'da yaygın)
-   **Time signals** — WWV (5/10/15 MHz) ABD, RWM Rusya
-   **Weather fax** (HF FAX) — denizcilere meteoroloji görüntü
-   **NOAA satellites** (137 MHz APT)

## Ekipman

### Entry: RTL-SDR ($30)

-   DVB-T USB stick + Q90 driver
-   Bilgisayar + SDR# yazılımı
-   HF eklemek için **HF dongle** (Ham It Up upconverter ~$50)
-   Toplam: $80 → 24 MHz - 1.7 GHz dinleme

[RTL-SDR tutorial →](/tutorials/rtl-sdr-ile-telsiz-dinleme)

### Mid-range ($300-500)

-   **Tecsun PL-880** — premium portable HF receiver
-   **Sangean ATS-909X2** — full-feature HF/SSB
-   **Eton Elite Executive** — premium portable
-   Anten dahili veya küçük long-wire

### High-end ($500+)

-   **SDRplay RSPdx** — geniş bant, premium SDR
-   **Airspy HF+ Discovery** — HF specialized
-   **AOR AR8200** — VHF/UHF scanner
-   Profesyonel SWL setup'ı

### Anten

-   **Long-wire** (5-30m tel) — ucuz, etkili
-   **Active loop** (Wellbrook ALA-100 vs) — küçük, kompakt
-   **Discone** — VHF/UHF wideband
-   **Random wire + tuner** — esnek

## SINPO raporu (signal report)

SWL'in özel signal raporu — broadcast istasyonları için 5 hane:

### S - Signal Strength (1-5)

-   1: zayıfca
-   5: çok kuvvetli

### I - Interference (1-5)

-   1: severe
-   5: yok

### N - Noise (1-5)

-   1: severe atmospheric
-   5: silent

### P - Propagation Distortion (1-5)

-   1: severe (fading, distortion)
-   5: clean

### O - Overall (1-5)

-   Subjektif kalite

### Örnek: SINPO 45444

> "Sinyal kuvvetli (4), interference yok (5), hafif noise (4), küçük distortion (4), genel iyi (4)"

Amatör radyo'nun "5/9 RST"sinin daha detaylı versiyonu.

## SWL log

Her dinleme kaydet:

| Tarih | Saat (UTC) | Frekans | Mod | İstasyon | Mesafe | SINPO |
| --- | --- | --- | --- | --- | --- | --- |
| 26.04.2026 | 1430 | 14.245 | USB | YO9DBP (Romanya) | 850 km | 5/9 |
| 26.04.2026 | 1500 | 9.580 | AM | China Radio Int | 8000 km | 44434 |

Gibi.

### Yazılımlar

-   **HamRS** (mobile, simple log)
-   **Logger32** (Windows full feature)
-   Kağıt defter de OK

## SWL eQSL kart

SWL'in karşılığında **eQSL kartı isteyebilir** — duyduğunu kanıtla.

### Süreç

1.  SWL log topla (özellikle Türkiye duymadığı uzak DX)
2.  Operatöre rapor gönder:
    -   Tarih + saat (UTC)
    -   Frekans + mod
    -   SINPO
    -   Sinyalden duyduğun spesifik bilgi (kontak yaptığı operatör çağrı işareti, ismi)
3.  eQSL kart talep
4.  Operatör (eğer onaylarsa) kart gönderir

### Avantaj

-   **DX hunting** lisanssız — uzak istasyonları "topla"
-   Award programı: SWL DXCC (100+ entity)
-   Hobi + öğrenme

### Türkiye için

-   TRAC SWL programı yıllık award

## Hangi bantlar / saatler?

### HF amatör dinleme

| Saat | Bant | Aktivite |
| --- | --- | --- |
| Sabah (06-10 UTC) | 7 MHz | Avrupa SSB |
| Gündüz (10-15 UTC) | 14 MHz | DX dünya |
| Akşam (15-20 UTC) | 14, 21, 28 MHz | DX altın |
| Gece (20-06 UTC) | 3.5, 7 MHz | Avrupa, Asya gece |

### Broadcast dinleme

-   Bantlar: 49m (5.9-6.2 MHz), 41m (7.2-7.5), 31m (9.4-9.9), 25m (11.6-12.1)
-   Akşam-gece daha aktif (D katmanı zayıf, F2 yansıtır)

### Numbers stations

-   4-10 MHz arası
-   Garip pattern, kadın ses tek tonda sayı
-   Geceleri yaygın

## Pirate radio (yasadışı broadcaster)

Avrupa'da yaygın, yasal olmayan müzik/sosyal yayın istasyonları:

-   Genelde **6.875 MHz, 6.910 MHz** kısa dalga
-   Caribbean / Avrupa pirates
-   Müzik (rock, polka, jazz)
-   Uzun yayın yapamaz — yetkililer kapatır
-   **Sen sadece dinle** — yasal sorun yok dinleyici için

## SWL kültürü vs amatör radyo

### SWL avantajları (lisanssız)

-   Lisans gerek yok
-   Dünya'yı dinle
-   Pratik, eğlenceli
-   Düşük maliyet

### SWL sınırlamaları

-   **TX yapamazsın** — sadece dinle
-   Kontak yok (interaksiyon yok)
-   Tartışma forumları az
-   "Sadece tüketici" hissi

### Doğal yol: SWL → Amatör

Çoğu amatör SWL ile başladı:

-   1-3 yıl SWL pratik (kültür öğren)
-   Lisans sınavı (KEGM)
-   Lisans aldıktan sonra **TX yap** + tam katılım

## Lisans hazırlığı için SWL

KEGM sınavı **yarım pratik bilgi**, **yarım teorik**. SWL pratik kısımda yardımcı:

### Öğrendiğin

-   Q kodlar (sürekli duyarsın)
-   Fonetik alfabe (her kontakta)
-   Frekans organizasyonu
-   Mod ayrımı (SSB vs FM vs CW)
-   Operatör adabı

### Sınav avantajı

SWL geçmişi olan adaylar **%80 başarı oranı**, sıfırdan başlayanlar %50.

## Sık sorulan sorular

### Lisans olmadan dinlemek yasal mı?

**Evet** — Türkiye yasası amatör bantlarda dinleme serbest. Sadece **TX** lisans şartı.

### Şifreli sinyalleri decode edebilir miyim?

-   Amatör bandlarda şifre yok (yasak)
-   Cellular GSM/LTE → şifreli, decode yasal sorun
-   Diplomatic / military → şifreli, decode yasal sorun
-   **Genel kural**: dinleyebilirsin ama decode etmek **yasal gri alan**

### En kolay başlangıç?

1.  RTL-SDR ($30) + bilgisayar
2.  SDR# yazılımı kur (ücretsiz)
3.  5m tel anten balkon
4.  7.150 MHz LSB → Avrupa amatör SSB

15 dakikada ilk dinleme.

### "Free band" pirate radio dinlenebilir mi?

-   Pirate radio dinleme **yasal**
-   Ama o frekansta TX yapma (lisans dışı)
-   Pratikte SWL → uzaktan kalma + kayıt

### SWL log gönderme zorunlu mu?

Hayır — sadece kişisel hobi. eQSL kart sadece **istersen** — operatöre rapor gönder, isteğe bağlı.

* * *

## İlgili kaynaklar

-   [RTL-SDR ile telsiz dinleme](/tutorials/rtl-sdr-ile-telsiz-dinleme) — pratik başlangıç
-   [SDR yazılım tabanlı telsiz](/tutorials/sdr-yazilim-tabanli-telsiz)
-   [HF propagasyon temelleri](/tutorials/hf-propagasyon-temelleri)
-   [Çağrı işareti nasıl alınır](/tutorials/cagri-isareti-nasil-alinir)
-   [Lisans sınavı simülatörü](/araclar/lisans-sinavi/) — SWL'den lisansa geçiş
-   [Q kodları + işletme adabı](/tutorials/q-kodlari-isletme-adabi)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — SWL makaleleri
