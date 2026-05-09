---
title: WinLink — Radyo Üzerinden E-posta (Acil İletişim Standardı)
description: >-
  WinLink — internet olmasa bile amatör HF/VHF radyo ile e-posta gönderme. Pat
  ve WinLink Express clientları, VARA HF modemi, AFAD acil iletişim, kurulum
  rehberi.
keywords:
  - winlink
  - email
  - acil-durum
  - vara
  - pat
  - hf
  - afad
article_section: winlink
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: WinLink kullanmak için lisans şart mı?
    a: >-
      **Evet** — RF üzerinden yayın yapıyorsun, amatör belgesi (TR'de A/B/C
      sınıfı) zorunlu
  - q: Hangi frekans?
    a: >-
      HF: 14.105, 7.105, 3.605 MHz çevresi (region 1). Tam liste WinLink Express
      channel listesinde
  - q: Maximum dosya boyutu?
    a: Tipik 100 KB (gateway'e göre değişir). Resimler için sıkıştır
  - q: Encrypted iletişim?
    a: >-
      Hayır, amatör şifreleme yasak. Ama mesajlar **plain text + sıkıştırma**
      (gzip) → herkes dinleyebilir
  - q: Hücresel + WiFi varken neden WinLink?
    a: Pratik için pratik yapmak; gerçek acil durumda hazır olmak
  - q: WinLink hesabımın e-posta adresi?
    a: >-
      `<callsign>@winlink.org` (örn. `TA1ABC@winlink.org`) — sana gelen
      mesajları normal e-posta gibi alır
  - q: 'Pactor modem $1500, çok mu?'
    a: Yes — VARA HF veya ARDOP (free) tercih edilir. Pactor profesyonel/military
---
## WinLink nedir?

**WinLink** — amatör + hükümet izinli radyo istasyonlarının dünyada **e-posta + dosya transferi** sağlayan açık ağı. 1999'da Steve Waterman (K4CJX) ve Vic Poor (W5SMM) tarafından geliştirildi; bugün **acil iletişim standardı** olarak kabul edilmektedir.

Anatomik yapı:

-   Operatör → bilgisayar → radyo (HF, VHF, UHF) → **RMS Gateway** (radio mail server) → İnternet → SMTP (alıcının normal e-posta hesabı)
-   İnternet yokken: **HF üzerinden** e-posta zincirleme atanır

Kullanım senaryoları:

-   🌪 **Doğal afet** (deprem, sel, fırtına): TR'de AFAD koordinasyonu, ABD'de FEMA
-   🛥 **Denizcilik**: Yelkenli teknelerde HF ile karaya e-posta (Iridium alternatifi, ücretsiz)
-   🏔 **Outdoor / dağcılık**: Hücresel kapsama olmayan bölgelerde
-   🚧 **Tatbikat**: Hava-Kara haberleşme, askeri benzer alıştırmalar

WinLink'in **diğer dijital modlardan farkı**: e-posta'nın store-and-forward, otomatik retry, sıkıştırma, attachment desteği — yani gerçek **production-grade** mesajlaşma.

## Çalışma şekli

```
   ┌──────────────────┐                        ┌────────────────────┐
   │ Senin laptop    │                        │ RMS Gateway        │
   │ + Telsiz (HF)   │                        │ (örn. Almanya'da)  │
   │                 │                        │                     │
   │ [Pat / WLE]     │ ──── HF radyo ────────►│ Internet'e basar    │
   └──────────────────┘     (VARA, ARDOP,     └────────┬───────────┘
                              Pactor, Packet)          │
                                                       ▼
                                              ┌─────────────────┐
                                              │ WinLink CMS     │
                                              │ (cloud server)  │
                                              └────────┬────────┘
                                                       │
                                                       ▼
                                              SMTP (gmail, outlook,
                                              normal e-posta hesapları)
```

**Tek yönlü değil**: alıcının cevabı aynı yolla seni geri bulur (kuyrukta bekler, sen bağlandığında indirir).

## Donanım protokolleri

WinLink farklı modulasyon protokolleri destekliyor:

| Protokol | Bant | Hız | Donanım |
| --- | --- | --- | --- |
| **VARA HF** | 2.7-3.0 kHz HF | 7-10 kbps (en hızlı amatör HF) | Ses kartı + telsiz (sadece yazılım) |
| **VARA FM** | VHF/UHF FM | 25 kbps | Ses kartı + FM telsiz |
| **ARDOP** | HF | 200 bps - 4 kbps | Ses kartı (open-source, free) |
| **Pactor** | HF | 100-5000 bps | SCS Modem (donanım, $1500+) |
| **Packet (AX.25)** | VHF FM | 1200-9600 bps | TNC (Mobilinkd, Kantronics) |

**Yeni başlayan için:** VARA HF (HF için en hızlı) + Pat client (cross-platform).

## Client yazılımları

| Yazılım | Platform | Lisans | Avantaj |
| --- | --- | --- | --- |
| **WinLink Express (WLE)** | Windows-only | Closed-source, free | Resmi client, en geniş protokol desteği |
| **Pat** | Win/Mac/Linux | Open-source (MIT) | Çok hafif, CLI + web UI; **Linux/Pi için ideal** |
| **PaclinkUNIX** | Linux | Open-source | Eski, gelişmiş kullanıcılar |
| **RMS Express Mobile** | Android | Closed | Mobile-only |

**Çoğu kullanıcı için:** WinLink Express (Win) veya Pat (Mac/Linux).

## WinLink Express kurulumu

### Adım 1: İndir + kur

[winlink.org/WinlinkExpress](https://winlink.org/WinlinkExpress) → installer (~30 MB) → Windows üzerine kur.

İlk açılış:

-   **My Callsign**: TA1ABC
-   **My Password**: WinLink şifresi (ilk seferinde otomatik üretilir)
-   **My Grid Square**: KN51 (Maidenhead konum kodu)
-   **Service codes**: PUBLIC (genel) veya EMCOMM (acil iletişim için)

### Adım 2: VARA HF modem kurulumu

VARA HF ücretsiz fakat closed-source. [rosmodem.wordpress.com](https://rosmodem.wordpress.com) → indir + kur. WinLink Express otomatik tanır.

VARA Lite ücretsiz: 7000 bps maksimum hız (yeterli e-posta için). VARA full: $69 (yıllık abonelik) → 12000 bps.

### Adım 3: Telsiz bağlantısı

Setup → Radios → "**Yaesu FT-991A**" / "Icom IC-7300" / vs. seç:

-   **CAT control**: COM port (telsizin USB sürücüsü kurulu olmalı)
-   **PTT**: CAT (modern) veya RTS
-   **Audio**: ses kartı bağlantısı (modern telsizler USB'de built-in)

### Adım 4: İlk bağlantı

`Open Session → VARA HF Winlink` → Channel Selection penceresi:

-   **Frekans tarama**: 14.105 MHz, 7.105 MHz, 3.605 MHz tipik
-   **RMS Gateway listesi**: dünya genelinde 200+ aktif gateway
-   En yakın + en güçlü sinyalli gateway seç

`Connect` → handshake → bağlantı kuruldu → posta kutun otomatik senkron.

### Adım 5: E-posta yaz + gönder

`Message → New Message`:

-   **To**: [friend@example.com](mailto:friend@example.com) (normal e-posta) veya `TA2XYZ` (başka WinLink kullanıcı)
-   **Subject**, **Body**, **Attachment** (max 100 KB tipik)
-   **Post to Outbox**

Outbox'a giden mesaj **bir sonraki bağlantı seansında** gönderilir. Hemen göndermek için Open Session → Connect → Send.

## Pat client (Mac / Linux)

Daha açık + cross-platform.

### Adım 1: İndir

[getpat.io](https://getpat.io) → işletim sistemine uygun binary veya Homebrew/apt:

```bash
# macOS
brew install la5nta/pat/pat

# Linux Debian/Ubuntu
sudo apt install pat
```

### Adım 2: Konfigürasyon

```bash
pat configure
```

Editör açar:

```json
{
  "mycall": "TA1ABC",
  "secure_login_password": "your-winlink-password",
  "locator": "KN51",
  "service_codes": ["PUBLIC"],
  "ax25": { ... },
  "ardop": { "addr": "localhost:8515" },
  "varahf": { "host": "localhost", "cmdport": 8300 }
}
```

### Adım 3: Web UI

```bash
pat http
```

Açıp `http://localhost:8080` → web tarayıcısı içinde Inbox/Outbox.

### Adım 4: VARA HF veya ARDOP modem

VARA HF Linux/Mac'te native değil — Wine ile çalıştırılır:

```bash
brew install wine-stable    # macOS
wine VARAHF_setup.exe       # Windows installer
```

Veya **ARDOP** (open-source, native):

```bash
brew install ardop
ardopcf -p VARA-port-rules
```

ARDOP biraz daha yavaş VARA'dan ama açık kaynak + native Linux/Mac.

## Acil durum kullanımı

### Senaryo: Deprem sonrası şehirde internet yok

1.  **Pil + radyoyu hazır tut** — Field Day kit
2.  HF telsizini aç, antene bağla (EFHW veya dipole)
3.  WinLink Express'i aç → VARA HF Session
4.  Yakın **EMCOMM gateway** seç (acil servis öncelikli)
5.  `EMERGENCY/` prefix ile mesaj — "I'm safe, location: Çamlıca, sonra ararım"
6.  Aile + AFAD koordinatörlerine e-posta atılır

**TR'de WinLink + AFAD**: Bazı il AFAD koordinatörleri WinLink kullanıyor; tatbikatlarda yer alıyorlar. Ulusal kurulum gelişmekte.

### Field test senaryoları

-   **HF dipole + 25W + VARA HF Lite** → Avrupa içi 90% başarı
-   **VHF FM packet (Mobilinkd TNC)** → 100 km'ye kadar hücresel-bağımsız
-   **5W QRP + VARA HF + iyi anten** → kıtalararası posta (yavaş ama çalışır)

## Sık sorulan sorular

| Soru | Cevap |
| --- | --- |
| WinLink kullanmak için lisans şart mı? | **Evet** — RF üzerinden yayın yapıyorsun, amatör belgesi (TR'de A/B/C sınıfı) zorunlu |
| Hangi frekans? | HF: 14.105, 7.105, 3.605 MHz çevresi (region 1). Tam liste WinLink Express channel listesinde |
| Maximum dosya boyutu? | Tipik 100 KB (gateway'e göre değişir). Resimler için sıkıştır |
| Encrypted iletişim? | Hayır, amatör şifreleme yasak. Ama mesajlar **plain text + sıkıştırma** (gzip) → herkes dinleyebilir |
| Hücresel + WiFi varken neden WinLink? | Pratik için pratik yapmak; gerçek acil durumda hazır olmak |
| WinLink hesabımın e-posta adresi? | `<callsign>@winlink.org` (örn. `TA1ABC@winlink.org`) — sana gelen mesajları normal e-posta gibi alır |
| Pactor modem $1500, çok mu? | Yes — VARA HF veya ARDOP (free) tercih edilir. Pactor profesyonel/military |

## SHARES, MARS — diğer ağlar

WinLink-benzer hükümet ağları:

-   **SHARES** (US DHS) — federal acil iletişim ağı
-   **MARS** (US Military) — askeri amatör radyo
-   **JNOS** — açık kaynak amatör + acil

Türkiye'de bu yapıların direkt eşleniği yok ama **TRAC** + **AFAD** koordinasyon eylemleri geliştirmekte.

## Yararlı kaynaklar

-   [WinLink Global Radio Email (resmi)](https://winlink.org)
-   [WinLink Express](https://winlink.org/WinlinkExpress)
-   [Pat — modern WinLink client](https://getpat.io)
-   [VARA HF (resmi)](https://rosmodem.wordpress.com)
-   [N1CLC: WinLink VARA HF rehber](https://www.n1clc.com/2022/06/winlink-email-using-vara-hf.html)
-   [K0PIR Icom 7300/7610 + VARA HF](https://www.k0pir.us/vara-winlink-express-e-mail-over-hf/)
-   [WinLink Wikipedia](https://en.wikipedia.org/wiki/Winlink)

## Sıradaki adımlar

-   [HF Dipole / EFHW Anten](/tutorials/hf-dipole-efhw-anten) — WinLink HF için anten
-   [FT8 Dijital Mod](/tutorials/ft8-dijital-mod) — kuzen dijital mod
-   [Çağrı İşareti Nasıl Alınır](/tutorials/cagri-isareti-nasil-alinir) — A/B sınıfı HF için şart
-   [POTA — Outdoor Amatör](/tutorials/pota-parks-on-the-air) — outdoor + WinLink kombo

73, ve umarım WinLink'i hiç **gerçek acil durumda** kullanmana gerek olmaz!
