---
title: 'CTCSS / DCS Tonları: Açıklama, Kullanım ve Sık Hatalar'
description: >-
  CTCSS (sub-audible ton) ve DCS (digital coded squelch) ne işe yarar, nasıl
  çalışır, telsiz programlamasında nasıl kullanılır, sık yapılan hatalar ve TR
  rölelerinde tipik tonlar.
keywords:
  - ctcss
  - dcs
  - röle
  - programlama
  - squelch
  - ton
article_section: ctcss
published_at: '2026-04-25'
updated_at: '2026-04-25'
faq:
  - q: Röle açılmıyor
    a: TX tonu yanlış veya OFF; röle başka bir ton bekliyor
  - q: Röle açılıyor ama sesini duyamıyorum
    a: >-
      RX tonu (Tone Squelch) yanlış set edilmiş — `Tone` yerine `TSQL`, ve röle
      CTCSS göndermiyor
  - q: 'Bazen açılıyor, bazen değil'
    a: Sinyal eşiği marjinal — daha güçlü anten gerek; ton doğru
  - q: Başka bir röleyi de duyuyorum
    a: >-
      İki röle aynı frekansta CTCSS bağımsız çakışıyor — RX tonunu set ederek
      istediğin röleyi izole et
  - q: DCS açılmıyor
    a: Polarity ters — N→R çevir
  - q: TX'te ton göndermiyor
    a: 'Mode = OFF, doğru `Tone` ile değiştir'
  - q: Telsizde ton menüsü yok
    a: Çok eski model — yenisi gerek (UV-K5 yetiyor)
---
## Squelch nedir? (temel kavram)

Bir telsizin alıcısı sürekli olarak antenden gelen RF'yi işler. Hiçbir yayın yokken bile çevreden gelen kozmik gürültü, atmosferik etki ve elektronik parazit hoparlörden **statik (beyaz gürültü)** olarak duyulur — "shhhhhh" sesi. **Squelch** (susturucu), bu gürültüyü kesmek için sinyal seviyesi belirli bir eşiğin altındayken hoparlörü **otomatik olarak kapatan** devredir.

Klasik squelch sadece **sinyal gücüne** bakar. Bir başka istasyon yeterince güçlü yayın yapıyorsa squelch açılır, siz onu duyarsınız — yayın sizin için kastedilmiş olsun veya olmasın. Şehir içinde bu yetersiz: bir kanaldaki röleyi dinlerken, yan kanaldan taşan başka bir kullanıcının sinyalini de duyarsınız.

İşte burada **CTCSS** ve **DCS** devreye girer.

## CTCSS — Continuous Tone-Coded Squelch System

CTCSS, telsizin yayın sırasında ses sinyalinin **altında** çok düşük frekanslı (67 Hz - 254 Hz arası) **sürekli bir ton** göndermesi prensibine dayanır.

### Nasıl çalışır?

```
Yayıncı (TX):
  ┌──────────────┐
  │ Ses sinyali  │ ──┐
  └──────────────┘   │
                     ▼
                  ┌─────┐    ┌─────────┐
                  │ MIX │───►│ Modüle  │───► Anten
                  └─────┘    └─────────┘
                     ▲
                     │
  ┌──────────────┐   │
  │ 100 Hz CTCSS │ ──┘
  └──────────────┘
   (sub-audible)

Alıcı (RX):
                       ┌──── 100 Hz tonu
                       │     duyar mı?
  Anten ─► Demodülatör ─┤
                       │     evet → squelch aç
                       └─── hayır → squelch kapalı tut
```

-   **TX (yayın):** "Bu yayın 100 Hz CTCSS tonu içerir" şifresi göndermek için sürekli ton ses sinyalinin altında ekler
-   **RX (alıcı):** "Sadece 100 Hz CTCSS tonu içeren yayınları aç" filtresi vardır
-   100 Hz tonsuz veya farklı tonlu yayınlar için squelch kapalı kalır → hoparlör sessiz

İnsan kulağı **300 Hz'den düşük** sesleri telsiz bandında duyamaz; bu yüzden CTCSS'e "**sub-audible** (duyulmaz) ton" denir.

### CTCSS hangi senaryolarda kullanılır?

#### 1\. Röle koruma

Röle alıcısı sürekli açık olsa, atmosferik gürültü + uzaktaki diğer kanal sinyallerini sürekli yayınlamaya başlar. CTCSS sayesinde **sadece kasıtlı operatörler** röleyi açabilir. Bu en yaygın kullanımdır.

#### 2\. Frekans paylaşımı (simplex)

Aynı frekansta farklı CTCSS tonları kullanan iki grup birbirini duymadan yayın yapabilir. Örnek:

-   Grup A: 145.500 + CTCSS 100 Hz
-   Grup B: 145.500 + CTCSS 123 Hz
-   Her grup sadece kendi tonunu duyar

#### 3\. Gürültü filtresi (mobile)

Mobil veya portatif kullanımda zayıf parazitleri otomatik kesip sadece tam yayınları duymak için RX tonu kullanılabilir.

### Yaygın CTCSS tonları (tam EIA standartı)

CTCSS standardı **50 farklı ton** tanımlar (her zaman aynı set). Aşağıda **EIA standart liste**si:

```
67.0   71.9   74.4   77.0   79.7   82.5   85.4   88.5   91.5   94.8
97.4   100.0  103.5  107.2  110.9  114.8  118.8  123.0  127.3  131.8
136.5  141.3  146.2  151.4  156.7  159.8  162.2  165.5  167.9  171.3
173.8  177.3  179.9  183.5  186.2  189.9  192.8  196.6  199.5  203.5
206.5  210.7  218.1  225.7  229.1  233.6  241.8  250.3  254.1
```

### TR rölelerinde tipik tonlar

Türkiye amatör röle pratiklerinde sık görülenler:

| Ton (Hz) | Yaygın kullanım |
| --- | --- |
| **67.0** | Klasik VHF röle, eski model |
| **77.0** | Çok yaygın TR röle (özellikle TA1, TA3) |
| **82.5** | Bazı bölgesel röleler |
| **88.5** | UHF röleler için sık |
| **100.0** | Yuvarlak değer, kolay hatırlanır, popüler |
| **123.0** | Bazı TA2 (Akdeniz) röleleri |
| **127.3** | TA1 Marmara'da popüler (Çamlıca, vd.) |
| **151.4** | UHF link röleler |
| **167.9** | Daha üst tonlardan biri |

(Dinamik liste için [amator.tr/role-export/](/role-export/) — her röle için tam ton bilgisi.)

### TX ton vs RX ton (kritik ayrım)

İki bağımsız ayar — bu en sık karıştırılan noktadır.

| Ayar | Ne yapar | Tipik değer |
| --- | --- | --- |
| **TX (yayın) ton** ("rTone" CHIRP'te) | Telsizinizin **yayın sırasında gönderdiği** ton. Röle bunu bekliyorsa yayınınızı tekrarlar. | 100 Hz (rölenin istediği) |
| **RX (alıcı) ton** ("cTone" CHIRP'te) | Telsizinizin **sadece bu tonu içeren yayınları açtığı** filtre. | Genelde **OFF** |

#### Tipik röle yapılandırması (en sık)

-   **Tone Mode**: `Tone`
-   **Tone (rTone)**: 100 Hz (rölenin TX-input için istediği)
-   **Tone Squelch (cTone)**: (boş)

Bu ayarla telsiziniz **100 Hz tonunu yayında alta gömer**, ama dinlemede her şeyi açar (rölenin geri-yayınını gibi). En esnek + en yaygın.

#### TSQL (TX + RX both) modu

-   **Tone Mode**: `TSQL`
-   **Tone**: 100 (TX)
-   **Tone Squelch**: 100 (RX)

Bu ayarla telsiziniz **sadece 100 Hz tonu içeren yayınları açar**. Avantaj: parazit + yan kanal tamamen kesik. Dezavantaj: röle CTCSS göndermiyorsa (çoğu röle göndermez) **hiçbir şey duyamazsınız**.

> **En sık hata:** Yeni operatör Tone Mode'u TSQL yapar, röle açar (TX OK), ama röleden gelen sinyali duyamaz (RX filtre yanlış). Çözüm: Tone Mode'u `Tone`'a düşür.

## DCS — Digital Coded Squelch

DCS, CTCSS'in **dijital versiyonudur**. Sürekli ton yerine, **134.4 bps hızında 23-bit dijital kod** gönderilir.

### Format

DCS kodları **üç haneli oktal**: 023, 047, 114, 251, 754 vb. Bazı telsiz menülerinde:

-   **D023N** — Normal polarite
-   **D023I** — Inverted (ters) polarite

Inverted nadiren gerekir; default Normal.

Toplam ~104 farklı DCS kodu vardır (CTCSS'te 50).

### CTCSS vs DCS karşılaştırması

| Özellik | CTCSS | DCS |
| --- | --- | --- |
| **Yaş** | 1960'lar | 1980'ler |
| **Ton/kod sayısı** | 50 | ~104 |
| **Sahtecilik direnci** | Düşük (yan kanaldan ton sızması olası) | Çok düşük (dijital, daha sıkı) |
| **Telsiz desteği** | Hemen hemen tüm amatör radyolar | Çoğu modern radyo, bazı eski model yok |
| **TR'de yaygınlık** | %85-90 | %10-15 |
| **Açılma süresi** | < 250 ms | < 350 ms (kod paketinin tamamı gelmeli) |

**Pratik tavsiye:** TR rölelerinde CTCSS hâlâ baskın. Ancak telsizinizde DCS desteği varsa, simplex grubunuzla DCS kullanmak parazit isolasyonunu artırır.

## Telsiz programlamasında — CHIRP referansı

CHIRP'te bir kanal için sütunlar:

| Sütun | Anlam | Tipik değer |
| --- | --- | --- |
| **Tone Mode** | Hangi mod kullanılacak | `OFF`, `Tone`, `TSQL`, `DTCS`, `Cross` |
| **Tone (rTone)** | TX CTCSS frekansı | 100.0 |
| **Tone Squelch (cTone)** | RX CTCSS frekansı | (genelde boş) |
| **DTCS Code** | TX/RX DCS kodu | 023 |
| **DTCS Polarity** | DCS Normal/Reverse | NN, NR, RN, RR |
| **Cross Mode** | TX ve RX farklı modlar | Tone→DTCS vb. (nadir) |

### Standart röle ayarı (CTCSS, sadece TX)

```
Tone Mode:      Tone
Tone:           100.0
Tone Squelch:   (boş)
```

### DCS röle (nadir)

```
Tone Mode:      DTCS
DTCS Code:      023
DTCS Polarity:  NN
```

### Mixed mode (CTCSS TX + DCS RX, nadir)

```
Tone Mode:      Cross
Cross Mode:     Tone→DTCS
Tone:           100.0
DTCS Code:      047
```

Bu son senaryoyu pratikte göremezsiniz; sadece kapsamlılık için.

## Sık sorunlar ve teşhis

| Belirti | Olası sebep |
| --- | --- |
| Röle açılmıyor | TX tonu yanlış veya OFF; röle başka bir ton bekliyor |
| Röle açılıyor ama sesini duyamıyorum | RX tonu (Tone Squelch) yanlış set edilmiş — `Tone` yerine `TSQL`, ve röle CTCSS göndermiyor |
| Bazen açılıyor, bazen değil | Sinyal eşiği marjinal — daha güçlü anten gerek; ton doğru |
| Başka bir röleyi de duyuyorum | İki röle aynı frekansta CTCSS bağımsız çakışıyor — RX tonunu set ederek istediğin röleyi izole et |
| DCS açılmıyor | Polarity ters — N→R çevir |
| TX'te ton göndermiyor | Mode = OFF, doğru `Tone` ile değiştir |
| Telsizde ton menüsü yok | Çok eski model — yenisi gerek (UV-K5 yetiyor) |

## Ton tespit araçları

Bilinmeyen bir röleyi karşılaşırsanız ton frekansını anlama yolları:

1.  **CHIRP'te scanner**: Bazı dijital telsizlerde "tone scan" var — kanal aç, ton tarar, bulur.
2.  **UV-K5 + F4HWN**: Menüde "tone scan" yok ama tüm 50 CTCSS'i tek tek manuel deneyebilirsin (~10 dk iş).
3.  **Topluluk listeleri**: TRAC, AKRAD, DARD, [amator.tr/role-export/](/role-export/) — bilinen tüm rölelerin tonu kayıtlı.
4.  **Spectrum + ton dekoder uygulamalar**: SDR (RTL-SDR + dump1090 / SDR# decoder eklentileri).

## Tarihçe — neden CTCSS var?

CTCSS 1960'larda ABD'de Motorola tarafından "Private Line" (PL) ticari adıyla geliştirildi. Polis, taksi, itfaiye gibi paylaşımlı ticari frekanslarda farklı şirketlerin birbirini duymadan yayın yapmasını sağladı. Amatör radyo standardı 1980'lerde **TIA/EIA-603-B** olarak normalleşti.

Tüm 50 standart ton bu spec'te tanımlı; üreticiler arası uyum garanti.

## Güvenlik & gizlilik notu

CTCSS / DCS **gizlilik aracı değildir**. Yayınınız hâlâ açık RF'tir, herhangi biri uygun donanımla (SDR, telsiz scanner, dump tool) **dinleyebilir**. Sadece **yan kanaldaki random kullanıcılarının duyma şansını azaltır**. Yasal olarak amatör frekanslarda **şifreleme yasaktır** — yayın açık, ton sadece UX/parazit yönetimi için.

## Sıradaki

-   [UV-K5 Programlama](/tutorials/uv-k5-programlama) — F4HWN'de Tone Mode menüsü kullanımı
-   [Röle Nedir?](/tutorials/role-nedir) — duplex shift + ton birlikte nasıl çalışır
-   [J-Pole Anten Yapımı](/tutorials/anten-yapimi-temel) — daha güçlü TX = ton iletim daha güvenilir

73!
