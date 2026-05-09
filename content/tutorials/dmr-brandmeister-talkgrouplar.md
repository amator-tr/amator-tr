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
updated_at: '2026-04-26'
faq:
  - q: Lisans gerek mi?
    a: >-
      Evet. DMR amatör radyo bandları kullanır → en az B sınıfı (VHF/UHF tam
      yetki). C sınıfı C-class hotspot kullanabilir ama 25W limit.
  - q: En ucuz DMR setup?
    a: >-
      - Anytone AT-D878UV (~6500 TL) → premium ama uzun ömür - Retevis RT3S
      (~3000 TL) — entry-level - TYT MD-380 (~2500 TL) — open hardware (OpenGD77
      firmware destekli)
  - q: Hotspot olmadan DMR yapılır mı?
    a: >-
      Evet, eğer DMR rölesi yakınında olursan. Türkiye'de ~30 DMR rölesi var
      (Çamlıca, Aydos, Loras vs). Röle CSV'si'nde DMR rölelerini filtrele.
  - q: TG 214 vs TG 99 hangisi?
    a: >-
      - TG 214 = Türkiye geneli ulusal kanal — herkes bağlı - TG 99 = sadece o
      röleye bağlı kullanıcılar — lokal sohbet
  - q: Brandmeister vs TGIF hangisi?
    a: >-
      - Brandmeister = mainstream, çok kullanıcı, mature - TGIF = daha küçük,
      daha disiplinli (spam az), Türkiye'de aktif sosyal grup
  - q: Kayıt ne kadar sürer?
    a: >-
      DMR ID radioid.net üzerinden 1-3 gün. Brandmeister hesap kaydı (varsa
      otomatik DMR ID ile) anlık. ---
---
[DMR tutorialımız](/tutorials/dmr-nedir-anytone-d878uv) DMR'ın ne olduğunu kapsıyor. Bu rehber bir adım daha — **Brandmeister** networku, talkgroup mimarisi, hotspot setupı, Türkiye TG214 ekosistemi.

## Brandmeister nedir?

DMR'ın en geniş amatör radyo ağı. Almanya merkezli açık kaynak proje, dünya çapında 50.000+ kayıtlı operatör, 5000+ röle.

### Yapı

-   **Master server** Almanya, redundant clusters
-   **Repeaters** lokal röleler internet üstünden bağlı
-   **Hotspots** kullanıcıların ev cihazları (Pi-Star vs)
-   **Talkgroup** tabanlı yönlendirme

### Alternatif ağlar

-   **TGIF Network** — daha küçük, Türkiye'de aktif kullanıcı
-   **DMR-MARC** — eski, eşzamanlı zayıf
-   **Phoenix** — UK merkezli, alt kategorisi

Türkiye operatörleri %80 Brandmeister, %15 TGIF, %5 diğer.

## Talkgroup (TG) ne işe yarar?

Klasik ham radio'da **frekans = kanal**. DMR'da **talkgroup = sanal kanal** — birden çok TG aynı röle/frekansı paylaşır, kullanıcı seçtiği TG'i dinler.

### Türkiye TG hierarşisi

| TG | Kapsama | Açıklama |
| --- | --- | --- |
| **TG 91** | Worldwide | Dünya geneli sohbet (yüksek trafik) |
| **TG 92** | Europe | Avrupa geneli |
| **TG 214** | **Türkiye** | TR ulusal kanal |
| **TG 223** | İstanbul | İstanbul bölge |
| **TG 224** | Ankara | Ankara bölge |
| **TG 225** | İzmir | İzmir bölge |
| **TG 235** | Bursa | Bursa bölge |
| **TG 240** | Antalya | Antalya bölge |
| **TG 99** | Local | Sadece bağlı röle |
| **TG 80250** | Türkçe Casual | Sosyal sohbet |

### Worldwide aktif TG'ler

-   **TG 91** — World English, çok kalabalık
-   **TG 222** — Italy
-   **TG 226** — France
-   **TG 235** — UK
-   **TG 240** — Sweden (not Antalya — same number, different region per country)
-   **TG 310** — USA
-   **TG 510** — Pakistan/Hindistan

DMR ID 6 haneli → ilk 3 hane ülke, sonraki kişi/röle. Türkiye prefiksi **214**.

## Time slot (TS) sistemi

DMR **TDMA** (Time Division Multiple Access) → **2 zaman slotu** aynı frekansta:

-   **TS1** — genelde wide-area / international
-   **TS2** — genelde local / regional

Bu yüzden bir DMR rölesinde aynı anda 2 görüşme yapılabilir (her slotta farklı TG).

### Türkiye standart yerleşimi

-   TS1: TG 214 (TR), TG 91 (worldwide), TG 92 (Europe)
-   TS2: TG 99 (lokal), TG 223 (İstanbul), TG 80250 (sohbet)

## Color Code (CC)

Aynı frekansta birden fazla DMR rölesi varsa **CC** ayrımı sağlar (analog'taki CTCSS gibi). 0-15 arası, çoğu Türkiye rölesi **CC 1**.

## DMR ID kayıt

Brandmeister kullanmak için **kişisel DMR ID** gerek:

1.  [radioid.net](https://radioid.net/) hesap aç
2.  Çağrı işareti + kişisel bilgi gir
3.  Lisans onay (BTK PDF veya TRAC kart)
4.  **6 haneli DMR ID** atanır (Türkiye 214xxxx)
5.  Bu ID telsizine programlanır

Süre: 1-3 gün.

## Hotspot — kişisel DMR cihazı

Yakın rölen yoksa veya kapalı alanda olsan bile DMR yapma yöntemi: **kişisel hotspot**.

### Pi-Star

-   Raspberry Pi + MMDVM (Multi-Mode Digital Voice Modem) modülü
-   DMR + D-STAR + C4FM + P25 — multi-protocol
-   Açık kaynak yazılım
-   Maliyet: ~$80-120 (Pi + MMDVM)

### Hazır cihazlar

-   **OpenSpot 4 Pro** (~$250) — premium
-   **DV4mini** (~$80) — entry-level
-   **ZUMSpot** (~$120) — popüler

### Kurulum

1.  Pi-Star image SD karta yaz
2.  WiFi config
3.  DMR ID + Brandmeister bağlantısı
4.  Telsiz hotspot frekansını programla (genelde 433.000 simplex, 1mW)

[Pi-Star detaylı setup tutorial — Brandmeister hotspot →](https://www.pistar.uk/)

## Anytone D878UV codeplug

[DMR + Anytone D878UV tutorialımız](/tutorials/dmr-nedir-anytone-d878uv) detayda var. Brandmeister için extra:

### Channels (Türkiye)

| Name | RX | TX | TS | TG |
| --- | --- | --- | --- | --- |
| TR-Cml-91 | 439.450 | 432.450 | 1 | 91 |
| TR-Cml-214 | 439.450 | 432.450 | 1 | 214 |
| TR-Cml-IST | 439.450 | 432.450 | 2 | 223 |
| TR-Cml-Local | 439.450 | 432.450 | 2 | 99 |

(Çamlıca rölesi örneği — gerçek frekansları [röle CSV'si](/role-export/)nden alın)

### Contacts (TGs)

TG 91, 92, 214, 223, 99, 80250 — minimum başlangıç set.

### Zones

-   **Zone 1: Türkiye** — TG 214, TG 91, TG 99 sıralı
-   **Zone 2: İstanbul** — TG 223, TG 99
-   **Zone 3: Worldwide** — TG 91, TG 92, TG 310

## Brandmeister web kontrol

[hose.brandmeister.network](https://hose.brandmeister.network/) — canlı stream, kim hangi TG'de konuşuyor görürsün.

Bireysel sayfan: [brandmeister.network/?page=user&Call=TB2KKD](https://brandmeister.network/?page=user&Call=TB2KKD) — çağrı işaretinin son aktiviteleri, hangi rölelere bağlandın.

## Pratik kullanım

### İlk DMR kontağı

1.  Telsizi TG 214 zone'una al
2.  Çağrı tuşuna bas → "CQ DMR Türkiye TB2KKD" demek yerine direkt:
    
    > "TG 214 burası TB2KKD, bağlı mı?"
    
3.  Cevap genelde anında — TG 214 7/24 aktif

### Hotspot ile kontak

-   Hotspot bağlı, TG 214 dinliyor
-   Telsiz hotspot frekansını dinliyor
-   TG 214'te konuşan kim varsa duyacaksın
-   TX yapınca hotspot Brandmeister'a yönlendiriyor

### Saat dilimi sorunu

TG 91 worldwide → 24/7 trafik, ama saatler farklı ülke. Avustralya gece 03:00'ta dinleyebilir, sen 14:00'ta.

## Disconnect ve PTT timeout

DMR'da TG'ye **manuel bağlanma**:

-   Kanal seçtiğinde otomatik bağlı (statik mod)
-   Veya **dynamic mod**: PTT'ye bas → röle TG'ye bağlanır → 5-10 dk inactive sonrası kopar

Statik vs dinamik konfigürasyon röle yöneticisi tarafından belirlenir.

## Yetkili kullanım

### Roger beep / parazit yapma

DMR'da bot, automated rebroadcast yasak (bireysel hotspot OK ama gateway gibi davranma).

### Spam / kötüye kullanım

Brandmeister network admins kötü kullanıcıyı **kick** edebilir (DMR ID disable). Disrupt davranış raporlanmalı.

### IPSC2 (alternatif)

Brandmeister benimseyemediğin gizlilik / kontrol için bazı topluluklar IPSC2 kullanır — kapalı amatör networkler.

## Sık sorulan sorular

### Lisans gerek mi?

Evet. DMR amatör radyo bandları kullanır → en az B sınıfı (VHF/UHF tam yetki). C sınıfı C-class hotspot kullanabilir ama 25W limit.

### En ucuz DMR setup?

-   **Anytone AT-D878UV** (~6500 TL) → premium ama uzun ömür
-   **Retevis RT3S** (~3000 TL) — entry-level
-   **TYT MD-380** (~2500 TL) — open hardware (OpenGD77 firmware destekli)

### Hotspot olmadan DMR yapılır mı?

Evet, eğer **DMR rölesi** yakınında olursan. Türkiye'de ~30 DMR rölesi var (Çamlıca, Aydos, Loras vs). [Röle CSV'si](/role-export/)'nde DMR rölelerini filtrele.

### TG 214 vs TG 99 hangisi?

-   **TG 214** = Türkiye geneli ulusal kanal — herkes bağlı
-   **TG 99** = sadece o röleye bağlı kullanıcılar — lokal sohbet

### Brandmeister vs TGIF hangisi?

-   **Brandmeister** = mainstream, çok kullanıcı, mature
-   **TGIF** = daha küçük, daha disiplinli (spam az), Türkiye'de aktif sosyal grup

### Kayıt ne kadar sürer?

DMR ID radioid.net üzerinden 1-3 gün. Brandmeister hesap kaydı (varsa otomatik DMR ID ile) anlık.

* * *

## İlgili kaynaklar

-   [DMR + Anytone D878UV temel](/tutorials/dmr-nedir-anytone-d878uv) — programlama detayı
-   [Echolink + Allstar VoIP](/tutorials/echolink-allstar-voip) — alternatif dijital
-   [Röle CSV exporter](/role-export/) — DMR röle listesi
-   [İlk telsiz satın alma](/tutorials/ilk-telsiz-satin-alma-rehberi)
-   Brandmeister: [brandmeister.network](https://brandmeister.network/)
-   DMR ID kayıt: [radioid.net](https://radioid.net/)
-   Pi-Star: [pistar.uk](https://www.pistar.uk/)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — DMR makaleleri
