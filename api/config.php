<?php
/**
 * Created by PhpStorm.
 * User: emrahyurttutan
 * Date: 28.04.2019
 * Time: 11:48
 */

@setlocale(LC_ALL,'tr_TR.UTF-8','turkish');

setlocale(LC_ALL,"turkish");

//sayfa tipini ve karakter setini ayarla
date_default_timezone_set('Europe/Istanbul');
ini_set("display_errors", 1);
//oturum açılmadıysa oturumu başlat
//header('Content-Type: application/html; charset=utf8');
if (empty($_SESSION)) {
    @session_start();
}
ob_start();

define('HOST', 'localhost');
define('VT_ADI', 'db');
define('VT_KULLANICI', 'user');
define('VT_SIFRE', 'pass');
define('DB_CHARSET', 'utf8');
define("ROOTFOLDER", dirname($_SERVER['SCRIPT_NAME']));
define("VER", "1.1");

require 'inc/Core.php';
require 'inc/Db.php';
require 'inc/App.php';

$db = new Db;
$start_microtime = microtime(true);
$request = requestData();

