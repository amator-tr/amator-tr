---
title: DMR Brandmeister Network ve Talkgroup Sistemi — Türkiye TG214
description: >-
  DMR Brandmeister network nedir, talkgroup yapısı (TG214 Türkiye, TG223
  İstanbul), TGIF, hotspot, Pi-Star kurulumu, Anytone D878UV codeplug. Internet
  köprüsü ile dünya çapında DMR.
keywords:
  - DMR
  - Brandmeister
  - talkgroup
  - TG214
  - hotspot
  - Pi-Star
article_section: DMR
published_at: '2026-04-26'
---
[DMR tutorialımız](/tutorials/dmr-nedir-anytone-d878uv) DMR'ın ne olduğunu kapsıyor. Bu rehber bir adım daha — **Brandmeister** networku, talkgroup mimarisi, hotspot setupı, Türkiye TG286 ekosistemi.

## Brandmeister nedir?

DMR'ın en geniş amatör radyo ağı. Almanya merkezli açık kaynak proje, dünya çapında 50.000+ kayıtlı operatör, 5000+ röle.

### Yapı

- **Master server** Almanya, redundant clusters
- **Repeaters** lokal röleler internet üstünden bağlı
- **Hotspots** kullanıcıların ev cihazları (Pi-Star vs)
- **Talkgroup** tabanlı yönlendirme

### Alternatif ağlar

- **TGIF Network** — daha küçük, Türkiye'de aktif kullanıcı
- **DMR-MARC** — eski, eşzamanlı zayıf
- **Phoenix** — UK merkezli, alt kategorisi

Türkiye operatörleri %80 Brandmeister, %15 TGIF, %5 diğer.

## Talkgroup (TG) ne işe yarar?

Klasik ham radio'da frekans = kanal. DMR'da talkgroup = sanal kanal — birden çok TG aynı röle/frekansı paylaşır, kullanıcı seçtiği TG'i dinler.

### Türkiye TG hiyerarşisi

| TG | Kapsama | Açıklama |
| :--- | :--- | :--- |
| **TG 91** | Worldwide | Dünya geneli sohbet (yüksek trafik) |
| **TG 92** | Europe | Avrupa geneli |
| **TG 286** | Türkiye | TR ulusal kanal (Türkiye MCC Kodu) |
| **TG 28634** | İstanbul | İstanbul bölge (286 + Plaka) |
| **TG 28606** | Ankara | Ankara bölge |
| **TG 28635** | İzmir | İzmir bölge |
| **TG 28616** | Bursa | Bursa bölge |
| **TG 28607** | Antalya | Antalya bölge |
| **TG 99** | Local | Sadece bağlı röle |
| **TG 80250**| Türkçe Casual| Sosyal sohbet |

### Worldwide aktif TG'ler

- **TG 91** — World English, çok kalabalık
- **TG 214** — Spain (İspanya Ulusal Kanalı)
- **TG 222** — Italy
- **TG 226** — France
- **TG 235** — UK
- **TG 310** — USA
- **TG 510** — Pakistan/Hindistan

DMR ID 7 haneli → ilk 3 hane ülke MCC kodu, sonraki kişi/röle. **Türkiye prefiksi 286'dır.** (Ör: 286XXXX)

## Time slot (TS) sistemi

DMR TDMA (Time Division Multiple Access) → 2 zaman slotu aynı frekansta:

- **TS1** — genelde wide-area / international / national (Örn: TG 286)
- **TS2** — genelde local / regional (Örn: TG 28634, TG 99)

Bu yüzden bir DMR rölesinde aynı anda 2 görüşme yapılabilir (her slotta farklı TG).

### Türkiye standart yerleşimi

- **TS1:** TG 286 (TR), TG 91 (worldwide), TG 92 (Europe)
- **TS2:** TG 99 (lokal), TG 28634 (İstanbul), TG 80250 (sohbet)

## Color Code (CC)

Aynı frekansta birden fazla DMR rölesi varsa CC ayrımı sağlar (analog'taki CTCSS gibi). 0-15 arası, çoğu Türkiye rölesi **CC 1**.

## DMR ID kayıt

Brandmeister kullanmak için kişisel DMR ID gerek:

1. `radioid.net` hesap aç
2. Çağrı işareti + kişisel bilgi gir
3. Lisans onay (BTK PDF veya KEGM kart)
4. 7 haneli DMR ID atanır (Türkiye 286xxxx)
5. Bu ID telsizine programlanır

Süre: 1-3 gün.

## Hotspot — kişisel DMR cihazı

Yakın rölen yoksa veya kapalı alanda olsan bile DMR yapma yöntemi: kişisel hotspot.

### Pi-Star

- Raspberry Pi + MMDVM (Multi-Mode Digital Voice Modem) modülü
- DMR + D-STAR + C4FM + P25 — multi-protocol
- Açık kaynak yazılım
- Maliyet: ~$80-120 (Pi + MMDVM)

### Hazır cihazlar

- **OpenSpot 4 Pro** (~$250) — premium
- **ZUMSpot** (~$120) — popüler

### Kurulum

1. Pi-Star image SD karta yaz
2. WiFi config
3. DMR ID + Brandmeister bağlantısı
4. Telsiz hotspot frekansını programla (genelde 433.000 simplex, 1mW)

## Anytone D878UV codeplug

DMR + Anytone D878UV tutorialımız detayda var. Brandmeister için extra (Çamlıca rölesi örneği):

### Channels (Türkiye)

| Name | RX | TX | TS | TG |
| :--- | :--- | :--- | :--- | :--- |
| TR-Cml-91 | 439.450 | 432.450 | 1 | 91 |
| TR-Cml-286 | 439.450 | 432.450 | 1 | 286 |
| TR-Cml-IST | 439.450 | 432.450 | 2 | 28634 |
| TR-Cml-Local| 439.450 | 432.450 | 2 | 99 |

### Contacts (TGs)

TG 91, 92, 286, 28634, 99, 80250 — minimum başlangıç set.

### Zones

- **Zone 1:** Türkiye — TG 286, TG 91, TG 99 sıralı
- **Zone 2:** İstanbul — TG 28634, TG 99
- **Zone 3:** Worldwide — TG 91, TG 92, TG 310

## Brandmeister web kontrol

`hose.brandmeister.network` — canlı stream, kim hangi TG'de konuşuyor görürsün.

Bireysel sayfan: `brandmeister.network/?page=user&Call=CAGRIISARETI` — çağrı işaretinin son aktiviteleri, hangi rölelere bağlandın.

## Pratik kullanım

### İlk DMR kontağı

Telsizi TG 286 zone'una al. Çağrı tuşuna bas → "CQ DMR Türkiye..." demek yerine direkt:

> "TG 286 burası TA1XXX, dinlemedeyim / bağlı mı?"

Cevap genelde anında — TG 286 7/24 aktif.

### Disconnect ve PTT timeout

DMR'da TG'ye manuel bağlanma:

- Kanal seçtiğinde otomatik bağlı (**statik mod**)
- Veya **dinamik mod**: PTT'ye bas → röle TG'ye bağlanır → 5-10 dk inactive sonrası kopar. Manuel koparmak için **TG 4000** (Disconnect) kullanılır.

## Sık sorulan sorular

### Lisans gerek mi?

Evet. DMR amatör radyo bandları kullanır → en az B sınıfı (VHF/UHF tam yetki) veya C sınıfı güç limitlerine uyarak.

### Hotspot olmadan DMR yapılır mı?

Evet, eğer DMR rölesi yakınında olursan. Türkiye'de ~30 DMR rölesi var (Çamlıca, Aydos, Loras vs). 

### TG 286 vs TG 99 hangisi?

- **TG 286** = Türkiye geneli ulusal kanal — kısa çağrılar ve herkesin duyduğu genel kanal.
- **TG 99** = sadece o an bağlı olduğun röledeki kullanıcılar — uzun lokal sohbet.
