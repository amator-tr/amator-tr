---
title: 'Egzotik Propagasyon — Meteor Scatter, EME, Aurora, Tropo Ducting'
description: >-
  VHF/UHF DX egzotik propagasyon modları — meteor scatter (MS), Earth-Moon-Earth
  (EME), Aurora, tropospheric ducting, transequatorial propagation. Hangi
  koşulda hangi mod?
keywords:
  - meteor scatter
  - EME
  - aurora
  - tropo
  - propagasyon
  - VHF DX
article_section: meteor scatter
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: Egzotik" demek "nadir" mi?
    a: >-
      HF DX'e göre evet, nadir + özel koşullara bağlı. Ama VHF DX'çiler için
      günlük heyecan — "tropo açtı, hızla telsize!"
  - q: En kolay VHF DX modu?
    a: >-
      Sporadic E yaz aylarında — özel ekipman gerek değil, sıradan 5W telsizle
      bile bazen DX kontak.
  - q: 'EME pahalı mı, kolay mı?'
    a: 'Pahalı (~$5K minimum), zor. CW + WSJT-X ile entry-level mümkün. Niche.'
  - q: Türkiye'den meteor scatter?
    a: Evet — Avrupa ile mükemmel mesafe. Yıllık 4-6 yağmur'da aktivite zirve.
  - q: Aurora kontağı" ne demek?
    a: >-
      K-index >5 ile VHF aurora reflection. Çok özel hava — yıllık 1-2 olay
      Türkiye'de. ---
---
[İyonosfer tutorialımız](/tutorials/ionosfer-katmanlari-detay) HF propagasyonun temelini işliyor. **VHF/UHF (50-1296 MHz)** iyonosfer dışında çalışır. Bu rehber sıradışı propagasyon yolları — meteor izleri, Ay yansıması, kuzey ışıkları, atmosferik kanallar.

## VHF/UHF neden farklı?

İyonosfer 30 MHz altında dalga yansıtır. Yüksek frekansta (>50 MHz):

-   Iyonosfer **çoğu zaman geçirgen** — dalga uzaya kaçar
-   Yer dalgası kısa menzil (10-30 km)
-   VHF DX için **özel mekanizmalar** lazım

İşte 5 ana egzotik propagasyon modu.

## 1\. Sporadic E (Es)

E katmanında **ani lokalize iyonizasyon**.

### Özellikleri

-   50-145 MHz (10m, 6m, bazen 2m)
-   Yaz aylarında (Mayıs-Ağustos) en aktif
-   800-2300 km mesafe single-hop
-   Süre: dakikalar - saatler

### Belirti

-   28 MHz (10m) sürekli açık
-   50 MHz (6m) Avrupa BAŞLA dolu
-   TV broadcast garıp interferans (eski analog dönem)

### Pratik

-   Yaz öğleden sonra 6m monitor (50.110 MHz CW beacon)
-   WSPR sürekli yayın → otomatik tespit
-   DX cluster'da spotting takip

[İyonosfer detay](/tutorials/ionosfer-katmanlari-detay) Es daha detaylı.

## 2\. Meteor Scatter (MS)

Meteor parçaları atmosferde yanarken **iyonize bir iz** bırakır → bu izden VHF dalgası yansıtılır.

### Fizik

-   Meteor 80-100 km yükseklikte yanar
-   1-100 saniyelik **plasma trail**
-   VHF (50-148 MHz) yansıtılır
-   Mesafe 800-2300 km single-hop

### Tipler

-   **Underdense** (zayıf, kısa < 1s) — ping
-   **Overdense** (kuvvetli, uzun 1-10s) — burn
-   **Sporadic** rastgele meteor
-   **Shower** meteor yağmuru (yıllık olaylar)

### Yıllık meteor yağmurları

-   **Quadrantids** Ocak başı
-   **Geminids** Aralık 13-14 (en aktif — yılda 100+ meteor/saat)
-   **Perseids** Ağustos 12-13 (klasik şampiyon)
-   **Lyrids** Nisan 22-23

### Kullanım: WSJT-X **MSK144** mod

-   Meteor scatter için tasarlanmış mod
-   15 saniyelik bursts
-   50.260 MHz (6m), 144.140 MHz (2m)

### Türkiye'den

-   Yılda 4-6 büyük meteor yağmuru → Avrupa kontak
-   Avrupa'dan Türkiye'ye 1500-2000 km, ideal MS mesafe
-   Operasyon: önceden plan, partner ile schedule, exact time + freq

## 3\. Earth-Moon-Earth (EME / "Moonbounce")

Sinyal Ay'a gönderilir, oradan yansıyıp dünyaya geri döner.

### Fizik

-   Ay 384.000 km uzakta, round-trip ~800.000 km
-   Round-trip 2.5 saniye gecikme
-   **Ay ideal yansıtıcı DEĞİL** — kraterli, pürüzlü yüzey elektromanyetik enerjinin çok büyük kısmını soğurur, sadece küçük bir yüzdesini düzensiz şekilde geri yansıtır. Telsizciliğin "Everest"i olarak kabul edilir.
-   Path loss: -250 dB (!) — çoğu sinyal kayıp

### İki eksenli takip zorunluluğu

Ay gökyüzünde sürekli hareket eder — sabit anten çalışmaz:

-   **Azimuth + elevation** takip — antenlerin milimetrik hassasiyetle Ay'ı izlemesi gerek
-   **Doppler etkisi** — Ay'ın dünyaya yaklaşma/uzaklaşma hızı frekansı sürekli kaydırır, operatör anlık düzeltme yapmalı
-   Otomatik tracking yazılımları (Moon Tracker) bunu kolaylaştırır

### Ekipman gerekleri

-   **Yüksek güç** — 1500W standart, 100W yetersiz (Ay'ın kötü yansıtma oranı yüzünden)
-   **Yüksek gain Yagi** — 4×4 stack 17-element (~$3000), sistemin her parçası en düşük kayıp / en yüksek verimle tasarlanmalı
-   **Düşük gürültü preamp** (LNA) — receiver noise figure 0.3-0.5 dB
-   **Hassas frekans** — Doppler düzeltme otomatik (CAT control)

### Modlar

-   **CW** — eski okul EME, tüm operatörler
-   **JT65** — WSJT-X içindeki mod, weak signal decode
-   **Q65** — modern mod, JT65'in evi

### Pratik

-   Ay 12 saatte bir görünür
-   "Common moon" — iki istasyon aynı anda Ay'ı görmeli
-   Avrupa-USA yaygın EME pair
-   Türkiye'den Pasifik EME mümkün

### Türkiye EME aktivitesi

-   5-10 aktif operatör (TA2RC, TA1RC vs)
-   Yılda 1-2 EME contest (ARRL EME)
-   Pahalı ekipman → niche topluluk

## 4\. Aurora propagasyon

**K-index >5** = geomanyetik fırtına = **kuzey ışıkları** + VHF reflection.

### Fizik

-   Güneş corona kütle atımı (CME)
-   Dünya manyetik alanı bozulur
-   Yüksek enlemlerde plasma curtain
-   VHF (28-148 MHz) yansıtılır

### Belirti

-   Kuzey kutbuna yakın istasyonlar VHF rapor
-   "Aurora distortion" — sinyal tipik buzz/raspy ses
-   HF aynı anda **black-out** olur

### Modlar

-   **CW** ses kalitesi distortion'i tolere edemez ama CW carrier OK
-   **SSB** ile ses Donald Duck olur — anlaşılmaz

### Türkiye'den

-   39° kuzey enlem → aurora nadir
-   Çok yüksek K-index (8+) durumda zayıfça duyulabilir
-   Iskandinavya, İngiltere, Kanada ana aurora bölgeleri

## 5\. Tropospheric Ducting (Tropo)

Atmosferin alt 10 km'inde **temperature inversion** → VHF/UHF için "kanal" oluşur.

### Fizik

-   Sıcak hava katmanı serin üzerine
-   Refractive index keskin değişim
-   VHF dalgası ışık gibi kanalda gider
-   Mesafe: 200-1500 km

### Belirti

-   144 MHz uzun mesafe sürekli kontak
-   432 MHz aynı zamanda
-   Kıyı bölgelerde yaygın (Karadeniz, Akdeniz, Marmara)
-   Yaz aylarında daha aktif

### Pratik

-   DX cluster'da "tropo open" raporları
-   Sahil amatörleri (TA8, TA1 prefiksleri) Tropo şampiyonları
-   Türkiye'den İtalya, Yunanistan, Bulgaristan tropo kontak

### Modlar

-   SSB / CW / FM hepsi — tropo lineer mod
-   Yüksek güç **gerek değil** (10-50W tropo'da yeter)

## 6\. Transequatorial Propagation (TEP)

Ekvator yakınında özel iyonosfer mekanizması — eşit-zıt enlem istasyonları arası.

### Fizik

-   F2 katmanı dağılımı ekvator hattında özel
-   50-220 MHz
-   5000-9000 km

### Türkiye'den

-   39° kuzey, ekvatordan uzak — TEP **Türkiye için zayıf**
-   Brezilya ↔ Güney Afrika vs. ana TEP yolları

## 7\. Sporadic-F (rare)

F katmanı sporadic — çok yoğun F2 yansıması, normal MUF üstünde.

-   Çok nadir
-   50 MHz'de 4000-6000 km tek hop
-   Solar maksimum dönemde mümkün

## 8\. Lightning Scatter

Yıldırım plasma'sı kısa süre VHF yansıtıcısı:

-   Mikroseconds süre
-   Çok zayıf
-   Pratik amatör için irrelevant ama teorik olarak ilginç

## Pratik aktivasyon ipuçları

### MS / EME için

-   WSJT-X yazılımı (ücretsiz)
-   Schedule partner ile (önceden anlaş)
-   Web'de "ON4KST" tarzı VHF chat — partner buluştur
-   TX/RX rotation tam saate göre (her 30 saniye)

### Aurora için

-   K-index >5 alarm (NOAA SWPC)
-   Antenni kuzeye çevir
-   144 MHz CW / SSB

### Tropo için

-   Hava durumu ile correlate — sıcaklık inversion
-   Sahil bölgesi
-   DX cluster aktivite

## Frekansa göre özet

| Bant | En sık egzotik mod |
| --- | --- |
| 50 MHz (6m) | Sporadic E (yaz), MS (yağmur), TEP (Brezilya) |
| 70 MHz (4m) | Es, MS — bazı ülkelerde tahsisli |
| 144 MHz (2m) | Tropo, MS, EME, Aurora |
| 432 MHz (70cm) | Tropo, EME |
| 1296 MHz (23cm) | EME, narrow tropo |
| 10+ GHz | Atmospheric ducting, rain scatter |

## Türkiye için özel bilgiler

### Tropo şanslı bölgeler

-   **İzmir-İstanbul** marmara/Akdeniz tropo açıklığı
-   **Antalya-Cyprus** sıkça açık
-   **Trabzon-Ukrayna** Karadeniz tropo

### MS aktivite

-   Avrupa hedef yok için 144 MHz MS Avrupa'ya
-   Geminids gece kontak yağmuru

### EME zorluğu

-   Ay yatay → Türkiye'den Avustralya zor (common moon kısıtlı)
-   Avrupa, USA East coast common moon var

## Sık sorulan sorular

### "Egzotik" demek "nadir" mi?

HF DX'e göre evet, nadir + özel koşullara bağlı. Ama VHF DX'çiler için günlük heyecan — "tropo açtı, hızla telsize!"

### En kolay VHF DX modu?

**Sporadic E** yaz aylarında — özel ekipman gerek değil, sıradan 5W telsizle bile bazen DX kontak.

### EME pahalı mı, kolay mı?

Pahalı (~$5K minimum), zor. CW + WSJT-X ile entry-level mümkün. Niche.

### Türkiye'den meteor scatter?

Evet — Avrupa ile mükemmel mesafe. Yıllık 4-6 yağmur'da aktivite zirve.

### "Aurora kontağı" ne demek?

K-index >5 ile VHF aurora reflection. Çok özel hava — yıllık 1-2 olay Türkiye'de.

* * *

## İlgili kaynaklar

-   [İyonosfer katmanları](/tutorials/ionosfer-katmanlari-detay) — temel propagasyon
-   [HF propagasyon temelleri](/tutorials/hf-propagasyon-temelleri)
-   [HF Propagasyon canlı durum](/araclar/propagasyon-durumu/) — NOAA SFI/K
-   [WSPR](/tutorials/wspr-zayif-sinyal-yayini)
-   [Satellite haberleşme](/tutorials/satellite-haberlesme-leo-amsat)
-   WSJT-X: [physics.princeton.edu/pulsar/k1jt/](https://physics.princeton.edu/pulsar/k1jt/)
-   ON4KST chat: [on4kst.com](https://www.on4kst.com/)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — egzotik propagasyon
