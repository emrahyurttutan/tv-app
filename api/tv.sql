-- phpMyAdmin SQL Dump
-- version 4.9.4
-- https://www.phpmyadmin.net/
--
-- Anamakine: localhost:3306
-- Üretim Zamanı: 26 Nis 2020, 22:55:27
-- Sunucu sürümü: 5.7.29
-- PHP Sürümü: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `onay` tinyint(4) NOT NULL,
  `datetime` varchar(25) COLLATE utf8_turkish_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci COMMENT='kategoriler';

--
-- Tablo döküm verisi `category`
--

INSERT INTO `category` (`id`, `name`, `onay`, `datetime`) VALUES
(1, 'Genel Kanallar', 1, '09-10-2019 22.20'),
(2, 'HD Kanallar', 1, '10-10-2019 0:11:54'),
(3, 'Haber Kanalları', 1, '10-10-2019 0:18:23'),
(4, 'Spor Kanalları', 1, '10-10-2019 20:33:27'),
(5, 'Çocuk Kanalları', 1, '10-10-2019 20:39:27'),
(6, 'Müzik Kanalları', 1, '10-10-2019 22:18:46'),
(7, 'Sinema Kanalları', 1, '10-10-2019 20:40:21'),
(8, 'Belgesel Kanalları', 1, '10-10-2019 20:40:31'),
(9, 'Yerel Kanallar', 1, '10-10-2019 20:40:39'),
(10, 'Dini Kanallar', 1, '10-10-2019 20:40:49'),
(11, 'Yabancı Kanallar', 1, '10-10-2019 20:41:04');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `channels`
--

CREATE TABLE `channels` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `icon` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `url` text COLLATE utf8_turkish_ci NOT NULL,
  `embed` tinyint(4) NOT NULL DEFAULT '0',
  `datetime` varchar(25) COLLATE utf8_turkish_ci NOT NULL,
  `onay` tinyint(4) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `channels`
--

INSERT INTO `channels` (`id`, `name`, `icon`, `url`, `embed`, `datetime`, `onay`) VALUES
(1, 'Kanal D', 'icon/kanal-d.jpg', 'https://media.dogannet.tv/S2/HLS_LIVE/kanaldnp/playlist.m3u8', 0, '13-10-2019 0:02:55', 1),
(2, 'TRT 1', 'icon/trt-1.jpg', 'https://trtcanlitv-lh.akamaihd.net/i/TRT1HD_1@181842/index_480p_av-p.m3u8?sd=10&rebase=on', 0, '13-10-2019 0:09:28', 1),
(3, 'Show TV', 'icon/show-tv.jpg', 'http://blutv-beta.akamaized.net/showhd/showtvhd.smil/playlist.m3u8', 0, '10-11-2019 13:46:33', 1),
(4, 'A Spor TR', 'icon/a-spor-tr.jpg', 'https://trkvz-m.ercdn.net/trkvz-temp/asporhdm.m3u8', 0, '13-10-2019 17:30:40', 1),
(5, 'A2 TV', 'icon/a2-tv.jpg', 'https://trkvz-m.ercdn.net/trkvz-temp/a2tvm.m3u8', 0, '13-10-2019 17:31:15', 1),
(6, 'TRT Spor', 'icon/trt-spor.jpg', 'https://mn-nl.mncdn.com/blutv_live/trtsporhd/trtsporhd.smil/playlist.m3u8', 0, '13-10-2019 17:32:14', 1),
(7, 'Sport TV 1', 'icon/sport-tv-1.jpg', 'https://5-226-137-173.netvarp.is/beint/sporttv1/tracks-v2a1/mono.m3u8', 0, '13-10-2019 17:35:25', 1),
(8, 'Sport TV 2', 'icon/sport-tv-2.jpg', 'https://5-226-137-173.netvarp.is/beint/sporttv2/tracks-v1a1/mono.m3u8', 0, '13-10-2019 17:35:54', 1),
(9, 'Sport TV 3', 'icon/sport-tv-3.jpg', 'https://213-167-154-115.netvarp.is/beint/sporttv3/mono.m3u8', 0, '13-10-2019 17:38:33', 1),
(10, 'Sport TV 4', 'icon/sport-tv-4.jpg', 'https://213-167-154-115.netvarp.is/beint/sporttv4/mono.m3u8', 0, '13-10-2019 17:38:55', 1),
(11, 'Sport TV 5', 'icon/sport-tv-5.jpg', 'https://213-167-154-115.netvarp.is/beint/sporttv5/mono.m3u8', 0, '13-10-2019 17:39:09', 1),
(12, 'Sport TV 6', 'icon/sport-tv-6.jpg', 'https://213-167-154-115.netvarp.is/beint/sporttv6/mono.m3u8', 0, '13-10-2019 17:39:21', 1),
(13, 'Tay TV', 'icon/tay-tv.jpg', 'https://tjktv-live.tjk.org/tjktv_720p.m3u8', 0, '13-10-2019 17:49:28', 1),
(14, 'Fenerbahçe TV', 'icon/fenerbahce-tv.jpg', 'https://stream-03.ix7.dailymotion.com/sec(1zZZZ1Jh3MWAQUOGa2TxYsfQXT-P5zibTPHtdxBviEQ)/dm/3/x21oo10/s/live-2.m3u8', 0, '13-10-2019 17:52:54', 1),
(15, 'Sports TV', 'icon/sports-tv.jpg', 'https://live.sportstv.com.tr/sportstv_ch1_low.m3u8', 0, '13-10-2019 17:54:59', 1),
(16, 'CBC Sport', 'icon/cbc-sport.jpg', 'https://streams.livetv.az/azerbaijan/cbc_sport_hd/playlist.m3u8', 0, '13-10-2019 17:57:55', 1),
(17, 'İdman TV', 'icon/idman-tv.jpg', 'http://streams.livetv.az/azerbaijan/idman2_stream/playlist.m3u8', 0, '13-10-2019 17:59:45', 1),
(18, 'Yeni Malatya Spor TV', 'icon/yeni-malatya-spor-tv.jpg', 'https://592f1881b3d5f.streamlock.net:1443/santraltv_925/santraltv_925/chunklist_w375211448.m3u8', 0, '13-10-2019 18:00:50', 1),
(19, 'TRT Çocuk', 'icon/trt-cocuk.jpg', 'http://trtcanlitv-lh.akamaihd.net/i/TRTCOCUK_1@181844/master.m3u8', 0, '13-10-2019 18:11:58', 1),
(20, 'Bein Sports Haber', 'icon/bein-sports-haber.jpg', 'https://www.youtube.com/embed/H56IWWcsAn8?rel=0&showinfo=0&autoplay=1&enablejsapi=1', 1, '14-10-2019 22:26:55', 1),
(24, 'TBMM TV', 'icon/tbmm-tv.jpg', 'http://mecliscanlitv-lh.akamaihd.net:80/i/MECLISTV_1@127503/master.m3u8', 0, '22-12-2019 12:30:36', 1),
(23, 'Teve 2', 'icon/teve-2.jpg', 'http://soledge7.dogannet.tv/S1/HLS_LIVE/tv2/1000/prog_index.m3u8', 0, '22-12-2019 12:28:28', 1),
(25, 'Star TV', 'icon/star-tv.jpg', 'https://lcgid8xu.rocketcdn.com/startvhd.stream_360p/chunklist.m3u8', 0, '22-12-2019 12:44:23', 1),
(26, 'Semerkand TV', 'icon/semerkand-tv.jpg', 'https://semerkandglb.mediatriple.net:1935/semerkandliveedge/semerkand1/playlist.m3u8', 0, '22-12-2019 12:43:50', 1),
(27, 'Power Türk', 'icon/power-turk.jpg', 'https://livetv.powerapp.com.tr/powerturktv/powerturkhd.smil/chunklist_b2650000_sltur.m3u8', 0, '22-12-2019 12:40:54', 1),
(31, 'Kral Pop', 'icon/kral-pop.jpg', 'https://bqgsd19q.rocketcdn.com/kralpop_720/chunklist.m3u8', 0, '22-12-2019 12:44:56', 1),
(30, 'Kral TV', 'icon/kral-tv.jpg', 'https://mid5dg6m.rocketcdn.com/kraltv_720/chunklist.m3u8', 0, '22-12-2019 12:40:17', 1),
(33, 'NTV', 'icon/ntv.jpg', 'https://nt4p9nef.rocketcdn.com/ntvhd.stream_720p/chunklist.m3u8', 0, '22-12-2019 12:54:19', 1),
(34, 'TRT Haber', 'icon/trt-haber.jpg', 'https://yanivideo.com/v/26868-5e05d3257130c12558ac440e/720p/index.m3u8', 0, '31-12-2019 12:06:50', 1);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `channel_category`
--

CREATE TABLE `channel_category` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `channel_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `channel_category`
--

INSERT INTO `channel_category` (`id`, `category_id`, `channel_id`) VALUES
(12, 1, 1),
(11, 2, 1),
(10, 9, 1),
(13, 1, 2),
(14, 2, 2),
(15, 9, 2),
(49, 1, 3),
(48, 2, 3),
(25, 4, 4),
(26, 4, 5),
(28, 4, 6),
(29, 2, 6),
(30, 4, 7),
(31, 4, 8),
(32, 4, 9),
(33, 4, 10),
(34, 4, 11),
(35, 4, 12),
(38, 4, 13),
(39, 4, 14),
(40, 4, 15),
(41, 4, 16),
(42, 4, 17),
(43, 4, 18),
(45, 5, 19),
(47, 4, 20),
(62, 3, 24),
(61, 1, 24),
(60, 9, 24),
(57, 1, 23),
(58, 9, 23),
(59, 7, 23),
(83, 2, 25),
(82, 1, 25),
(81, 9, 25),
(80, 10, 26),
(79, 1, 26),
(78, 9, 26),
(75, 6, 27),
(84, 6, 31),
(97, 9, 34),
(91, 9, 33),
(74, 6, 30),
(90, 3, 33),
(89, 2, 33),
(96, 3, 34),
(95, 2, 34);

--
-- Tablo için tablo yapısı `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `adi` varchar(20) COLLATE utf8_turkish_ci NOT NULL,
  `role_json` longtext COLLATE utf8_turkish_ci,
  `onay` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `roles`
--

INSERT INTO `roles` (`id`, `adi`, `role_json`, `onay`) VALUES
(1, 'Admin', '[{\"SN\":\"Category\",\"MN\":\"Category\",\"id\":33},{\"SN\":\"Category\",\"MN\":\"Detail\",\"id\":34},{\"SN\":\"Category\",\"MN\":\"SaveOrUpdate\",\"id\":31},{\"SN\":\"Channels\",\"MN\":\"Channels\",\"id\":33},{\"SN\":\"Channels\",\"MN\":\"Detail\",\"id\":34},{\"SN\":\"Channels\",\"MN\":\"SaveOrUpdate\",\"id\":31},{\"SN\":\"HomePage\",\"MN\":\"HomePage\",\"id\":8}]', 1),
(2, 'Editör', NULL, 1),
(3, 'Üye', NULL, 1),
(4, 'Misafir', NULL, 1),
(5, 'Herkes', NULL, 1);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `pass` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `active` tinyint(4) NOT NULL DEFAULT '0',
  `role_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `users`
--

INSERT INTO `users` (`id`, `name`, `pass`, `email`, `status`, `active`, `role_id`) VALUES
(1, 'Emrah Yurttutan', '902e213868c5c8f96d5b37b2e1d04ea4', 'emrah@yurttutan.net', 1, 1, 1);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `user_token`
--

CREATE TABLE `user_token` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `login_date` varchar(200) COLLATE utf8mb4_turkish_ci NOT NULL,
  `expiration_time` varchar(200) COLLATE utf8mb4_turkish_ci NOT NULL,
  `token` varchar(200) COLLATE utf8mb4_turkish_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Tablo döküm verisi `user_token`
--

INSERT INTO `user_token` (`id`, `user_id`, `login_date`, `expiration_time`, `token`) VALUES
(1, 1, '26-04-2020 22:55:13', '137197230883200', '7ef5d482-53b4-4187-8459-c6a99b8bacbe');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `channels`
--
ALTER TABLE `channels`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `channel_category`
--
ALTER TABLE `channel_category`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `user_token`
--
ALTER TABLE `user_token`
  ADD PRIMARY KEY (`id`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Tablo için AUTO_INCREMENT değeri `channels`
--
ALTER TABLE `channels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Tablo için AUTO_INCREMENT değeri `channel_category`
--
ALTER TABLE `channel_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- Tablo için AUTO_INCREMENT değeri `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Tablo için AUTO_INCREMENT değeri `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Tablo için AUTO_INCREMENT değeri `user_token`
--
ALTER TABLE `user_token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
