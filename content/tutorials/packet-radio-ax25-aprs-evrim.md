---
title: Packet Radio ve AX.25 Protokolü — APRS'in Kökenleri
description: >-
  Packet radio tarihi, AX.25 protokolü, TNC (Terminal Node Controller),
  1200/9600 baud, BBS sistemleri. APRS'in 1980'lerden gelişimi, Türkiye packet
  aktiviteleri.
keywords:
  - packet
  - AX.25
  - TNC
  - APRS
  - dijital
  - tarih
article_section: packet
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: Klasik BBS hâlâ var mı?
    a: >-
      Çok az aktif. Bireysel operatörler nostaljik deney yapıyor — Türkiye'de
      bilinen aktif yok.
  - q: AX.25 öğrenmek faydalı mı?
    a: >-
      Tarih + temel teknik bilgi olarak. Pratik kullanım sınırlı (APRS yeter).
      Ama mesh networks (HAMnet) altyapısı AX.25 derslerine borçlu.
  - q: Direwolf zor mu?
    a: >-
      Standart kurulum 30 dakika. Linux/Mac terminal komutu, Windows GUI yok.
      Web docs iyi.
  - q: TNC'siz packet yapılır mı?
    a: >-
      Evet — Direwolf gibi yazılım TNC = sadece bilgisayar yeter. Eskiden
      donanım TNC zorunluydu.
  - q: 9600 baud Baofeng ile mümkün mü?
    a: >-
      Hayır — el telsizlerin TXout filtresi 9600 FSK için çok dar. Mobile (Yaesu
      FT-7800, Kenwood TM-D710) destekler. Klasik el telsizi → 1200 baud. ---
---
İnternet öncesi: 1980'ler. Amatör operatörler **packet radio** ile e-posta gönderiyor, mesaj sunucusuna (BBS) bağlanıyor, dijital chat yapıyor. Bugün **APRS** olarak bildiğimiz sistemin temeli budur. Bu rehber packet radio tarihçesi + AX.25 protokol detayı + modern uygulamaları.

## Packet radio nedir?

**Bilgisayar verisi** + **amatör radyo** kombinasyonu. Veri paketleri (packets) halinde gönderilir, hata düzeltmeli, robust. Klasik internet TCP/IP'in radyo eşdeğeri.

### Temel öğeler

-   **Bilgisayar** — verici uçta yazılım çalışan terminal
-   **TNC** (Terminal Node Controller) — bilgisayar ↔ telsiz interface
-   **Telsiz** — VHF/UHF FM (genelde 144.390 MHz APRS'te)
-   **AX.25 protokol** — paketleme standartı

### Akış

```
[Bilgisayar] → [TNC] → [Telsiz TX] →     →     [Telsiz RX] → [TNC] → [Bilgisayar]
   data        modulate   AFSK signal             demodulate   data
```

## Tarihçe

### 1970'ler: doğum

-   1971: Hawaii Üniversitesi **ALOHAnet** — ilk paket radyo network
-   ABD ham radio **packet protocol** geliştirmeye başladı
-   TAPR (Tucson Amateur Packet Radio) kurucu organizasyon

### 1980'ler: altın çağ

-   1984: **AX.25 v2** standartlaştırıldı
-   TNC-1, TNC-2 kart bilgisayara takılır → yazılım çalıştırır
-   **BBS** (Bulletin Board System) — amatör radyo "internet" alternatifi
-   **DX cluster** — DX bilgi paylaşımı, hâlâ kullanılır
-   Mailbox sistemi — operatörler birbirine email

### 1990'lar: gerileme

-   Internet patlama → e-mail, web pratik alternatif
-   Paket radyo trafiği azaldı
-   **APRS** (Bob Bruninga WB4APR) 1992 — packet'ın "kayıt + harita" varyasyonu olarak doğdu

### 2000-2010: APRS canlı, klasik packet ölü

-   APRS GPS pozisyonu + harita için ideal
-   Klasik BBS / mail systems çoğunlukla kapatıldı
-   WinLink (radyodan e-mail) packet'ın yenilenmiş versiyonu

### 2020+: nostaljik geri dönüş

-   Genç jenerasyon "retro" tech ilgisi
-   Packet BBS canlanması (P2P yine artıyor)
-   Mesh networks (HAMnet) packet inspirasyonu

## AX.25 protokolü detayı

X.25 (telekom standartı) → amatör radyo için adapte edilmiş = **AX.25**.

### Frame yapısı

```
[Flag] [Address] [Control] [PID] [Info] [FCS] [Flag]
  1B    14-70B    1-2B      1B   0-256B  2B    1B
```

-   **Flag** (0x7E) — frame başlangıç + bitiş
-   **Address** — kim kime, callsign + SSID
-   **Control** — frame türü (data, ack, beacon)
-   **PID** — protokol ID (TCP/IP, IP, vs)
-   **Info** — payload
-   **FCS** — Frame Check Sequence (CRC hata kontrol)

### Callsign + SSID

Aynı operatörün birden fazla istasyonu olabilir:

-   TA1XYZ-0 = ana telsiz
-   TA1XYZ-7 = el telsizi (mobile)
-   TA1XYZ-9 = APRS aracı
-   TA1XYZ-10 = hotspot

15 farklı SSID (-1 ile -15) atanabilir.

### Connected vs Connectionless

-   **Connected (UI)** — link kurulur, ack'lı, güvenilir
-   **Connectionless** — beacon, broadcast, cevap bekleme

APRS = connectionless (beacon yayını), klasik BBS = connected.

## TNC (Terminal Node Controller)

TNC = packet radio'nun "modem'i". Bilgisayar veri ↔ AFSK ses dönüşüm.

### Donanım TNC

-   **Kantronics KPC-3 Plus** (klasik, hâlâ kullanılır) ~$200
-   **MFJ-1270** modern alternatif
-   **Kenwood TS-2000 dahili** TNC bazı transceiver'larda gömülü

### Yazılım TNC (modern)

-   **Direwolf** — açık kaynak Win/Mac/Linux, ses kart üzerinden, ücretsiz
-   **AGW Packet Engine** — Windows
-   **UISS** — Win, packet client + AGW Engine

Direwolf en popüler — bilgisayar ses kart yeter, ekstra donanım gerek yok.

### Bağlantı

```
[Telsiz audio out] → [Bilgisayar mic in] → Direwolf decode
[Telsiz mic in] ← [Bilgisayar audio out] ← Direwolf encode
[Telsiz PTT] ← [Bilgisayar serial RTS] (or VOX)
```

## Hız (Baud rate)

### 1200 baud (klasik)

-   VHF FM bandlarda standard
-   Bandwidth ~3 kHz (ses kanal)
-   AFSK Bell 202 modulation
-   Uzak menzil tolerated

### 9600 baud

-   7.5x daha hızlı
-   Bandwidth aynı (FSK)
-   Menzil 1200'den biraz daha az
-   Telsiz **9600 baud destekli olmalı** — eski el telsizleri sadece 1200

### Daha hızlı (modern)

-   **HamNet** (mesh network) — 5-10 GHz, ethernet hızı (Mbps)
-   **D-STAR DD mode** 128 kbps
-   Klasik AX.25 1200/9600 hâlâ ana

## Türkiye'de packet aktiviteleri

### 1985-1995 altın dönem

-   İstanbul packet BBS network: TA1ABC, TA1XYZ aktif sysop'lar
-   Ankara, İzmir packet aynı dönemde
-   Aralarında gateway link (HF packet)

### 2000+

-   Klasik BBS kapanmaları
-   APRS 144.800 MHz aktif (Türkiye standardı)
-   WinLink RMS gateway operatörleri (ulusal afet kapasitesi)

### 2026

-   ~30-50 aktif APRS istasyonu
-   5-10 WinLink RMS gateway
-   Klasik BBS yok, sadece nostaljik bireysel deneyler

## APRS — packet'ın yaşayan torunu

Packet radio'nun en yaşayan parçası. **APRS = Automatic Packet Reporting System**.

### Sistem

-   144.800 MHz (Türkiye), 144.390 MHz (US) FM frekansı
-   1200 baud AX.25 üzerinden
-   **Beacon** (broadcast) — her operatör pozisyonu/durumu yayar
-   **Digipeater** — geniş alan kapsamı
-   **iGate** — internet gateway, aprs.fi'ye yükler

### Bilgi tipleri

-   **Position** — GPS koordinatı
-   **Status** — kısa text mesaj
-   **Telemetry** — sensör verisi (sıcaklık, hava)
-   **Weather** — meteoroloji istasyonu
-   **Mic-E** — ses üzerinden APRS (mobile için)

### Türkiye'de APRS

-   144.800 MHz aktif 7/24
-   5-10 digipeater (Ankara Elmadağ, İstanbul Çamlıca, İzmir)
-   aprs.fi'de Türkiye haritası: [aprs.fi/?lat=39&lng=35&z=6](https://aprs.fi/)
-   Detay: [APRS tutorial →](/tutorials/aprs-nedir-nasil-kullanilir)

## WinLink — packet evolu

[WinLink tutorial →](/tutorials/winlink-email-over-radio) detayda. Kısa: packet AX.25 üstüne **e-mail protokolu** eklenmiş.

### Avantaj

-   Klasik AX.25 + modern email format
-   HF + VHF gateway'lar
-   Internet'siz mesajlaşma — afet için kritik

## Yeni başlayanlar için packet

Klasik packet öğrenmek istersen:

### Setup (~$200)

1.  **Eski VHF FM telsiz** (ya da hatta yeni Baofeng UV-5R)
2.  **Bilgisayar** + ses kart (USB cable telsize)
3.  **Direwolf** — ücretsiz software TNC
4.  **UISS** veya **Outpost** — packet client

### Pratik

-   144.800 MHz tune (APRS Türkiye)
-   Direwolf çalıştır → packet decode et
-   AGWPE üzerinden TX yap (kayıtlı CQ vs)
-   aprs.fi'de senin çağrı işaretin görünür

### Mobile APRS

-   Anytone D878UV gibi GPS dahili telsiz → otomatik beacon
-   Veya APRSdroid (Android) + telsiz

## Sık sorulan sorular

### Klasik BBS hâlâ var mı?

Çok az aktif. Bireysel operatörler nostaljik deney yapıyor — Türkiye'de bilinen aktif yok.

### AX.25 öğrenmek faydalı mı?

Tarih + temel teknik bilgi olarak. Pratik kullanım sınırlı (APRS yeter). Ama **mesh networks** (HAMnet) altyapısı AX.25 derslerine borçlu.

### Direwolf zor mu?

Standart kurulum 30 dakika. Linux/Mac terminal komutu, Windows GUI yok. Web docs iyi.

### TNC'siz packet yapılır mı?

Evet — Direwolf gibi yazılım TNC = sadece bilgisayar yeter. Eskiden donanım TNC zorunluydu.

### 9600 baud Baofeng ile mümkün mü?

Hayır — el telsizlerin TXout filtresi 9600 FSK için çok dar. Mobile (Yaesu FT-7800, Kenwood TM-D710) destekler. Klasik el telsizi → 1200 baud.

* * *

## İlgili kaynaklar

-   [APRS](/tutorials/aprs-nedir-nasil-kullanilir) — modern packet kullanımı
-   [WinLink](/tutorials/winlink-email-over-radio) — radyodan email
-   [DMR Brandmeister](/tutorials/dmr-brandmeister-talkgrouplar) — modern dijital alternatif
-   [JS8Call](/tutorials/js8call-radyo-chat-modu) — chat modu
-   Direwolf: [github.com/wb2osz/direwolf](https://github.com/wb2osz/direwolf)
-   aprs.fi haritası
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — packet radio makaleleri
