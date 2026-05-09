---
title: DMR Nedir? Anytone D878UV ve Brandmeister TG 286 (Türkiye)
description: >-
  DMR (Digital Mobile Radio) amatör telsiz dijital modu — TDMA slot, talkgroup,
  Brandmeister network, DMR ID nasıl alınır, Anytone AT-D878UV programlama ve TG
  286 Türkiye topluluğu.
keywords:
  - dmr
  - anytone
  - brandmeister
  - dijital
  - hotspot
  - tg286
article_section: dmr
published_at: '2026-04-25'
updated_at: '2026-04-25'
faq:
  - q: Encryption (şifreleme) yapılabilir mi?
    a: >-
      **HAYIR** — amatör bantta yasak (FCC + Türk yönetmelik). Ticari DMR'da var
      ama "amatör mode"da kullanılmamalı
  - q: 5W el telsizimle hotspot olmadan röleye ulaşır mıyım?
    a: Şehirde yakın röle varsa evet. Aksi halde hotspot şart
  - q: 'Codeplug''ım bozuldu, fabrika sıfırla?'
    a: >-
      Anytone'da Tool → Read → backup, sonra Reset. Bozarsanız son backup'tan
      restore
  - q: Brandmeister dashboard'da kendi callsign'ım çıkmıyor?
    a: DMR ID yanlış set edilmiş veya hotspot/röle Brandmeister'a bağlı değil
  - q: 'C4FM, D-STAR ile fark?'
    a: >-
      DMR daha popüler, daha ucuz radyo. C4FM Yaesu-only. D-STAR Icom-only. Üçü
      de Pi-Star'da paralel
  - q: Anlık röle/hotspot kullanımı ucretli mi?
    a: 'Hayır, **tamamen ücretsiz** — gönüllü topluluk operasyonu'
---
## DMR nedir?

**DMR — Digital Mobile Radio**, ETSI tarafından standardize edilen (TS 102 361) profesyonel dijital telsiz protokolü. 2005'te ticari + askeri/güvenlik kullanımı için geliştirildi; 2010'lardan itibaren amatör radyo topluluğu tarafından adapte edildi.

Analog FM'den temel farkları:

-   **Dijital ses**: AMBE+2 codec, 2.4 kbps — daha temiz, gürültüsüz; sinyal eşiğinde "ya tam temiz ya hiç" karakteri
-   **TDMA (Time Division)**: Tek 12.5 kHz kanalda **2 slot** — iki QSO eşzamanlı yan yana çalışabilir
-   **Network bağlantısı**: Internet üzerinden global röleler birbirine bağlı (Brandmeister, TGIF, DMR-MARC)
-   **Talkgroup (TG) sistemi**: Geleneksel "tek kanal/tek konuşma" yerine, binlerce sanal konuşma odası
-   **Tek tuşla DX**: 5W el telsiziyle Tokyo'daki bir operatörle anında konuşmak

### Amatör vs ticari DMR farkı

Aynı protokol, farklı kurallar:

-   Ticari: Encrypted, sahibe ait, kapalı network
-   Amatör: Açık (encryption yasak), kullanıcı ID'leri public, herkes dinleyebilir + kayıt edebilir

## DMR network'leri

| Network | Açıklama | URL |
| --- | --- | --- |
| **Brandmeister** (en büyük) | %85 amatör DMR trafiği, 50+ ülke gateway | [brandmeister.network](https://brandmeister.network) |
| **TGIF Network** | Brandmeister'a alternatif, daha basit dashboard | [tgif.network](https://tgif.network) |
| **DMR-MARC** | İlk amatör DMR network, hâlâ aktif | [dmr-marc.net](https://www.dmr-marc.net) |
| **DMRplus** | Avrupa-ağırlıklı network | [dmrplus.com](https://www.dmrplus.com) |

**Brandmeister TR'de standart** — neredeyse tüm aktif TR DMR rölelelri Brandmeister'a bağlı.

## TG (Talkgroup) ne demek?

Bir TG, bir **sanal konuşma odası**dır. Kanaldan bağımsız olarak operatörler aynı TG'ye girip konuşur. Her TG numaralı:

| TG | Kapsam |
| --- | --- |
| **TG 286** | **Türkiye** (Türkiye nasyonal — TR'de ana iletişim TG'si) |
| TG 91 | Worldwide English |
| TG 92 | Worldwide Tactical |
| TG 96 | Worldwide German/Austrian |
| TG 222 | Italy |
| TG 244 | Finland |
| TG 268 | Iberia |
| TG 222001-9 | Italian regional |
| TG 8 | Hotspot local talk (kendi cihazınızla test) |

Kullanıcı kendi telsizinden TG seçer ve bu TG'nin "bağlı olduğu" tüm röleler/hotspot'lar bu konuşmayı yayınlar. Mesela 286'a girip selam derseniz İstanbul, İzmir, Ankara, Trabzon vd. tüm Brandmeister-bağlı röleler aynı anda konuşmanızı yayar; istasyondaki herkes duyar.

## Donanım — DMR'a nasıl başlanır?

### Tier 1: El telsizi + bilinen röle

Türkiye'de aktif DMR röleleri (Brandmeister'a bağlı) İstanbul (Çamlıca), Ankara (Beytepe), İzmir, Bursa, Trabzon ve diğer şehirlerde mevcut. Eğer bölgenizde DMR rölesi varsa, sadece DMR-uyumlu telsiz yeter.

### Tier 2: El telsizi + hotspot (öneri — daha esnek)

DMR rölesi olmayan bölgede yaşıyorsanız — veya istediğiniz TG'lere doğrudan girmek istiyorsanız — **hotspot** (kişisel mini-röle) kurarsınız:

```
[ Anytone D878UV ]──RF──[ MMDVM Hotspot ]──WiFi──[ Internet ]──[ Brandmeister ]
```

-   5W el telsiz → 0.1W hotspot (5-10m radius) → internet üzerinden network
-   Sabit IP gerekmez (NAT-friendly)
-   24/7 çalışabilir, evde sürekli aktif olur

## Telsiz tavsiyeleri

| Model | Fiyat | Özellik |
| --- | --- | --- |
| **Anytone AT-D878UV II Plus** | $230-280 (TR'de ~7000-9000 TL) | En popüler amatör DMR, GPS + APRS + AirTalk + Bluetooth + 4000 kanal |
| **Anytone AT-D578UV (mobil)** | $400-500 | Araç içi, GPS, dual-receive |
| **TYT MD-UV390** | $130-180 | Daha ucuz, GPS opsiyonel |
| **Connect Systems CS800D Plus** | $300+ | Mobil, profesyonel kullanım |
| **Radioddity GD-77** | $120 | Ucuz başlangıç (OpenGD77 firmware ile çok yetenekli) |
| **Hotspot: MMDVM Pi-Star** | $80-200 | Pi 3/4 + MMDVM hat board + LCD case |

**Çoğu kullanıcı için: Anytone AT-D878UV II Plus** — TR ekosisteminde standart, codeplug paylaşımı en kolay.

## DMR ID — zorunlu kayıt

DMR'a geçmeden önce **kişisel DMR ID** almalısınız. Lisans (çağrı işareti) zaten varsa hemen alınır:

1.  [**radioid.net**](https://radioid.net) açın
2.  **"Register"** → çağrı işareti + e-posta + lisans belgesi yüklemesi (PDF/JPG)
3.  Onay 24-48 saat (manuel inceleme — fake hesabı engellemek için)
4.  Onay e-postasıyla **7 haneli ID** gelir (örn. `2861234`)

ID format:

-   İlk 3 hane: ülke kodu (286 = Türkiye)
-   Son 4 hane: kullanıcı sıra numarası

**ID'niz radyoda set edilmedikçe DMR yayını yapamazsınız** — aksi halde "İD 0000000" görünür ve röle/hotspot reddeder.

## Anytone AT-D878UV programlama

### Hazırlıklar

| İhtiyaç | Açıklama |
| --- | --- |
| Anytone AT-D878UV II Plus | Cihaz |
| Standart Anytone programlama kablosu | $20 (TYT vs uyumsuz) |
| Anytone CPS yazılımı | [anytone.org/wp/downloads/](https://anytone.org/wp/downloads/) — Windows only (macOS Wine ile, Linux'ta unsupported) |
| DMR ID (radioid.net'ten) | Yukarıdaki adım |
| Codeplug taslağı | Aşağıda |

### Adım 1: CPS'i bağla

1.  Telsiz **kapalı**, kabloyu üst kulaklık jakına tak, USB'yi PC'ye
2.  Telsizi **aç**
3.  CPS'te **Tool → COM Port → Auto detect** veya manuel COMx seç
4.  **Program → Read from radio** → mevcut config indirilir (~30 sn)

### Adım 2: Radio Settings → DMR ID

`Common Setting → Optional Setting → DMR ID` alanına ID'nizi gir. **Çağrı işaretinizi de yaz** (LCD'de görünür).

### Adım 3: Talkgroup tanımları

`Digital → Talk Groups` tablosuna ekle:

| TG # | İsim | Çağrı Tipi |
| --- | --- | --- |
| 286 | Turkey | Group Call |
| 91 | Worldwide | Group Call |
| 92 | WW Tactical | Group Call |
| 8 | Hotspot Local | Group Call |
| 9 | Local | Group Call |

(İhtiyacınıza göre genişletebilirsiniz — 250+ ülke + bölgesel TG'leri vardır.)

### Adım 4: Channels (kanal listeleri)

Her DMR kanal için:

| Alan | Değer |
| --- | --- |
| **RX/TX Frequency** | Rölenin / hotspot'un frekansları |
| **Channel Type** | Digital |
| **Color Code** | Genelde 1 (röleye göre değişir) |
| **TX Permit** | Always (hotspot) veya Channel Free |
| **Slot** | TS1 veya TS2 (röleye göre — TG 286 genelde TS2) |
| **Contact (TG)** | Hangi TG'ye bağlanacak (örn. 286) |
| **RX Group List** | Aynı kanalda dinlenecek diğer TG'ler |

Her TG için ayrı kanal yapmak en yaygın — örn. "TR-286" kanalı, "WW-91" kanalı, "Local-9" kanalı.

### Adım 5: Yaz + test

`Program → Write to radio` → 30-60 sn → telsiz kendiliğinden yeniden başlar.

Test:

1.  Hotspot kurulu mu kontrol et (RGB LED → yeşil = idle, kırmızı = TX)
2.  Telsizden TG 286 kanalını seç
3.  PTT bas, 1-2 saniye konuş
4.  Brandmeister dashboard'da [brandmeister.network/?page=hoseline](https://brandmeister.network/?page=hoseline) → kendi callsign'ını gör

## Pi-Star hotspot (5 dakikada kurulum)

[**Pi-Star**](https://www.pistar.uk) — Andy Taylor (MW0MWZ) tarafından yazılan, Raspberry Pi üzerinde çalışan **çoklu-mode dijital hotspot** (DMR + D-STAR + Fusion + NXDN + P25). Kurulum:

1.  Pi 3/4/Zero 2 W + MMDVM hat board (~$50-80)
2.  [pistar.uk/downloads](https://www.pistar.uk/downloads) → SD card image yaz
3.  Pi'yi aç → ilk açılışta WiFi-AP modunda, telefonla bağlan
4.  Web UI → Configuration → DMR Master: `BM_2862_Turkey` (Türkiye Brandmeister sunucusu)
5.  DMR ID: `<senin-id>`
6.  Frekans: 433.450 MHz tipik (TR DMR amatör segmenti)
7.  Save → 30 sn → çalışır

Telsizinizi hotspot frekansına programlarken color code = 1, slot = TS2, TG = 286 (veya hangi TG istiyorsanız).

## Hazır codeplug kaynakları (TR)

-   [DMR Türkiye](https://www.dmrturkiye.com) — TR codeplug'ları, röle listesi, kullanım rehberleri
-   [TA1MD DMR Programlama](https://www.qsl.net/ta1md/DMR.htm)
-   [TA2KS DMR](https://ta2ks.wordpress.com/category/dmr/)
-   [Anytone.org Codeplugs](https://anytone.org/wp/codeplugs/) — uluslararası, TR-specific yok ama 286 TG'sini ekleyebilirsiniz

Hazır codeplug → cihaza yükle → tweak → kullan. 4-6 saatlik kurulumun yerine 15 dakika.

## Brandmeister dashboard kullanımı

[brandmeister.network](https://brandmeister.network) → top right "Login" → Self Care → callsign'ınızla giriş.

Faydalı sayfalar:

-   **Hoseline** ([/?page=hoseline](https://brandmeister.network/?page=hoseline)) — anlık global trafiği canlı dinle (browser üzerinden)
-   **Last Heard** — kim şu son birkaç dakikada konuştu
-   **Talkgroups** — tüm TG'lerin gerçek zamanlı aktivitesi
-   **Self Care → Hotspot Security** — hotspot'unuza şifre koyun (önemli, başkasının sizin ID'nizle TX yapması engellenir)

## Etiket — DMR'da nasıl konuşulur?

Analog röleyle aynı protokol + birkaç fark:

-   **PTT'den 0.5-1 sn sonra konuş** — DMR codec başlatma gecikmesi var
-   **TG değişimi**: Yeni TG'ye geçtiğinizde "TA1ABC monitoring TG 91" gibi söyleyin — diğerleri uyaranır
-   **Kısa tut**: TG'ler global, başkalarının QSO'sunu uzun açıklamayla blokla
-   **Hotspot trafik**: Eğer hotspot'tan TG 91'e girip İngilizce konuşmuyorsanız, kısa süre tutun (uluslararası TG'ler dolu)
-   **TG 286 (TR)**: Türkçe + Türkler arası, daha rahat. Akşamlar 19:00-23:00 yoğun.

## Sık sorulan sorular

| Soru | Cevap |
| --- | --- |
| Encryption (şifreleme) yapılabilir mi? | **HAYIR** — amatör bantta yasak (FCC + Türk yönetmelik). Ticari DMR'da var ama "amatör mode"da kullanılmamalı |
| 5W el telsizimle hotspot olmadan röleye ulaşır mıyım? | Şehirde yakın röle varsa evet. Aksi halde hotspot şart |
| Codeplug'ım bozuldu, fabrika sıfırla? | Anytone'da Tool → Read → backup, sonra Reset. Bozarsanız son backup'tan restore |
| Brandmeister dashboard'da kendi callsign'ım çıkmıyor? | DMR ID yanlış set edilmiş veya hotspot/röle Brandmeister'a bağlı değil |
| C4FM, D-STAR ile fark? | DMR daha popüler, daha ucuz radyo. C4FM Yaesu-only. D-STAR Icom-only. Üçü de Pi-Star'da paralel |
| Anlık röle/hotspot kullanımı ucretli mi? | Hayır, **tamamen ücretsiz** — gönüllü topluluk operasyonu |

## İleri konular

-   **DMR over Allstar/EchoLink bridges**: TG'leri analog repeater'a bridge etmek
-   **OpenGD77 firmware** (Radioddity GD-77 için): Ucuz cihazı pro seviyeye çıkar
-   **DMR + GPS + APRS**: D878UV'in GPS'i Brandmeister'a konumunuzu basabilir, [aprs.fi](https://aprs.fi)'de görünürsünüz
-   **Roaming**: Birden fazla röleyi otomatik takip (mobil kullanım — D878UV destekler)

## Yararlı kaynaklar

-   [DMR Türkiye](https://www.dmrturkiye.com) (TR — en kapsamlı)
-   [Brandmeister Network](https://brandmeister.network) (resmi)
-   [RadioID.net](https://radioid.net) — DMR ID kayıt
-   [Pi-Star](https://www.pistar.uk) — hotspot OS
-   [DMR ID nedir, nasıl alınır (Malatya TRAC)](https://www.malatyatrac.org.tr/2025/06/28/dmr-id-nedir-ve-nasil-alinir-detayli-rehber/) (TR)
-   [Anytone D878UV programlama (DMR Türkiye)](https://www.dmrturkiye.com/anytone-at-d878uv-el-telzini-programlama/) (TR)
-   [Anytone CPS Downloads](https://anytone.org/wp/downloads/)

## Sıradaki adımlar

-   [Quansheng UV-K5](/tutorials/uv-k5-programlama) — analog FM tarafı, DMR'la birlikte iyi kombo
-   [APRS Nedir](/tutorials/aprs-nedir-nasil-kullanilir) — D878UV GPS ile APRS de yayar
-   [Çağrı İşareti Nasıl Alınır](/tutorials/cagri-isareti-nasil-alinir) — DMR ID için lisans şart
-   [Mors Kodu Öğrenme](/tutorials/mors-kodu-ogrenme) — DMR'a karşı CW: dijital vs analog dünyalar

73 ve TG 286'da görüşürüz!
