<?php
/**
 * Created by PhpStorm.
 * User: emrahyurttutan
 * Date: 27.04.2019
 * Time: 21:33
 */


error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('memory_limit', '-1');
ignore_user_abort(1);
ini_set('max_execution_time', 999999999999); //300 seconds = 5 minutes
header("Content-type: application/json; charset=utf-8");
error_reporting(E_ALL);
ini_set("display_errors", 1);
require 'config.php';
cors();
ignore_user_abort(true);

function authControl()
{
    global $db, $request;
    if (isset($request) and isset($request->token)) {
        $user = $db->sec('u_t.expiration_time, u.name, u.email,u.role_id,u.id,r.adi as role_name,r.role_json', 'user_token as u_t, users as u,roles as r', 'u_t.user_id = u.id and u.role_id=r.id and u_t.token=' . db::kontrol($request->token, 'text'))->oku();
        if (isset($user) and isset($user['expiration_time']) and $user['expiration_time'] >= time()) {
            $request->info = array('name' => $user['name'], 'email' => $user['email'], 'user_id' => $user['id'], 'role_id' => $user['role_id'], 'role_name' => $user['role_name'], 'role_json' => $user['role_json']);
            return array("result" => true);
        } else {
            return array("result" => false, "echo" => prepare_json('Geçersiz token yeniden oturumun açınız', 401));
        }
    } else {
        return array("result" => false, "echo" => prepare_json('Geçersiz token yeniden oturumun açınız. Token yok', 401));
    }
}

function userAuth($result = false)
{
    $isAuth = authControl();
    if (isset($isAuth) and empty($isAuth['result'])) {
        echo $isAuth['echo'];
        exit();
    }
    if ($result) {
        return $isAuth;
    }
}


Router::post('/login', function () use ($db, $request) {
    //prepare_json($request, '200', '', $db);
    if (isset($request) and isset($request->email) and isset($request->password)) {
        $email = db::kontrol($request->email, "text");
        $sifre = db::sifrele($request->password);
        $sifre = db::kontrol($sifre, "text");
        $uye = $db->sec("u.name, u.email,u.role_id,u.id,r.adi as role_name,u.status,u.active,r.role_json", "users as u,roles as r", "r.id = u.role_id and email=$email and pass=$sifre")->oku();
        if ($db->say) {
            if ($uye['status'] and $uye['active']) {
                $_POST['token'] = $token = create_guid();
                $_POST['user_id'] = $uye['id'];
                $_POST['login_date'] = $db->suan;
                $_POST['expiration_time'] = time() * (60 * 60 * 24);
                $db->form_ekle('user_token');
                echo prepare_json('Giriş Başarılı', 200,
                    array('name' => $uye['name'], 'email' => $uye['email'], 'user_id' => $uye['id'], 'role_id' => $uye['role_id'], 'role_name' => $uye['role_name'], 'role_json' => $uye['role_json'], 'access_token' => $token)
                );
            } else {
                echo prepare_json('Hesabınız aktif değil sistem yöneticisi ile iletişime geçiniz!!', 400);
            }
        } else {
            echo prepare_json('Email Adresiniz veya Şifreniz hatalı!!', 400);
        }

    } else {
        echo prepare_json('Email veya password null olamaz', 400);
    }
});

Router::post('/user', function () use ($db, $request) {
    $user = userAuth(true);
    if (isset($user['result']) and $user['result'] === true) {
        echo prepare_json('', 200, $request);
    }
});

Router::post('/category/add', function () use ($db, $request) {
    userAuth();
    if (is_object($request) and isset($request->data) and isset($request->data->name)) {
        $db->sec("*", "category", 'name=' . db::kontrol($request->data->name, 'text'))->oku();
        if (!$db->say) {
            $_POST = (array)$request->data;
            $_POST['datetime'] = $db->suan;
            if ($db->form_ekle('category')) {
                echo prepare_json('Kategori Ekleme Başarılı', 200, '');
            } else {
                echo prepare_json('Kategori Ekleme Başarısız', 200, '');
            }
        } else {
            echo prepare_json('Kategori daha önceden eklenmiş!', 400);
        }
    } else {
        echo prepare_json('Kategori adı boş olamaz!', 400);
    }
});
Router::post('/category/delete', function () use ($db, $request) {
    userAuth();
    if (is_object($request) and isset($request->data) and isset($request->data->id)) {
        $db->sec("*", "category", 'id=' . db::kontrol($request->data->id, 'int'))->oku();
        if ($db->say) {
            if ($db->sil('category', $request->data->id)) {
                echo prepare_json('Kategori Silme Başarılı', 200, '');
            } else {
                echo prepare_json('Kategori Silme Başarısız', 200, '');
            }
        } else {
            echo prepare_json($request->data->id . ' idli kategori bulunamadı!', 400);
        }
    } else {
        echo prepare_json('Kategori id boş olamaz!', 400);
    }
});

Router::post('/category/update', function () use ($db, $request) {
    userAuth();
    if (is_object($request) and isset($request->data) and isset($request->data->id)) {
        $db->sec("*", "category", 'id=' . db::kontrol($request->data->id, 'int'))->oku();
        if ($db->say) {
            $_POST = (array)$request->data;
            $_POST['datetime'] = $db->suan;
            if ($db->form_guncelle('category', $request->data->id)) {
                echo prepare_json('Kategori Güncelleme Başarılı', 200, '');
            } else {
                echo prepare_json('Kategori Güncelleme Başarısız', 200, '');
            }
        } else {
            echo prepare_json($request->data->id . ' idli kategori bulunamadı!', 400);
        }
    } else {
        echo prepare_json('Kategori id boş olamaz!', 400);
    }
});

Router::post('/category_channels/([0-9]+)', function ($site, $siteId) use ($db, $request) {
    //userAuth();
    $where = ' c_c.category_id=' . db::kontrol($siteId, 'int');
    $results = $db->sec("channels.*", "channels as channels, channel_category as c_c", 'channels.id=c_c.channel_id  and ' . $where)->oku(false);
    if ($db->say) {
        echo prepare_json('', 200, $results);
    } else {
        echo prepare_json('Kategoride kanal bulunamadı!', 400);
    }
});

Router::post('/category/([0-9]+)', function ($site, $siteId) use ($db, $request) {
    userAuth();
    $where = ' id=' . db::kontrol($siteId, 'int');
    $results = $db->sec("*", "category", $where)->oku();
    if ($db->say) {
        echo prepare_json('', 200, $results);
    } else {
        echo prepare_json('Kategoride kanal bulunamadı!', 400);
    }
});
Router::post('/categories', function () use ($db, $request) {
    userAuth();
    $orderField = $request->orderField ? $request->orderField : 'id';
    $orderby = $request->orderby ? $request->orderby : 'DESC';
    $where = $request->where ? $request->where : '1=1';
    $days = $db->sec("*", "category", $where, $orderField . ' ' . $orderby)->oku(false);
    if ($db->say) {
        echo prepare_json('', 200, $days);
    } else {
        echo prepare_json('Kategori bulunamadı!', 400);
    }
});


Router::post('/channel/add', function () use ($db, $request) {
    userAuth();
    if (is_object($request) and isset($request->data) and isset($request->data->name)) {
        $db->sec("*", "channels", 'name=' . db::kontrol($request->data->name, 'text'))->oku();
        if (!$db->say) {
            $_POST = (array)$request->data;
            if (isset($request->data->icon)) {
                $icon_name = permalink($request->data->name) . '.jpg';
                ImageDownload($request->data->icon, $icon_name);
                $_POST['icon'] = 'icon/' . $icon_name;
            }

            $_POST['datetime'] = $db->suan;
            $categories = $request->data->categories;
            if ($db->form_ekle('channels')) {
                $channel_id = $db->lastInsertId();
                $_POST = array();
                if (is_array($categories) and count($categories) > 0) {
                    foreach ($categories as $cat) {
                        $_POST['category_id'] = $cat;
                        $_POST['channel_id'] = $channel_id;
                        $db->form_ekle('channel_category');
                    }
                }

                echo prepare_json('Kanal Ekleme Başarılı', 200, $channel_id);
            } else {
                echo prepare_json('Kanal Ekleme Başarısız', 200, '');
            }
        } else {
            echo prepare_json('Kanal daha önceden eklenmiş!', 400);
        }
    } else {
        echo prepare_json('Kanal adı boş olamaz!', 400);
    }
});

Router::post('/channel/([0-9]+)', function ($site, $siteId) use ($db, $request) {
    userAuth();
    $where = ' id=' . db::kontrol($siteId, 'int');
    $results = $db->sec("*", "channels", $where)->oku();
    if ($db->say) {
        $categories = $db->sec("category_id", "channel_category", 'channel_id=' . db::kontrol($siteId, 'int'))->oku(false);
        $cat_data = [];
        if (is_array($categories) and count($categories) > 0) {
            foreach ($categories as $cat) {
                $cat_data[] = $cat['category_id'];
            }
        }

        $results['icon'] = 'https://tvapi.yurttutan.net/' . $results['icon'];

        $results['categories'] = $cat_data;
        echo prepare_json('', 200, $results);
    } else {
        echo prepare_json('Kategoride kanal bulunamadı!', 400);
    }
});
Router::post('/channels/delete', function () use ($db, $request) {
    userAuth();
    if (is_object($request) and isset($request->data) and isset($request->data->id)) {
        $channel = $db->sec("*", "channels", 'id=' . db::kontrol($request->data->id, 'int'))->oku();
        if ($db->say) {
            $db->sil('channel_category', $request->data->id, 'channel_id');
            if ($db->sil('channels', $request->data->id)) {
                if (isset($channel['icon'])) {
                    unlink($channel['icon']);
                }
                echo prepare_json('Kanal Silme Başarılı', 200, '');
            } else {
                echo prepare_json('Kanal Silme Başarısız', 200, '');
            }
        } else {
            echo prepare_json($request->data->id . ' idli kanal bulunamadı!', 400);
        }
    } else {
        echo prepare_json('Kanal id boş olamaz!', 400);
    }
});

Router::post('/channel/update', function () use ($db, $request) {
    userAuth();
    if (is_object($request) and isset($request->data) and isset($request->data->id)) {
        $channel = $db->sec("*", "channels", 'id=' . db::kontrol($request->data->id, 'int'))->oku();
        if ($db->say) {
            $_POST = (array)$request->data;
            $_POST['datetime'] = $db->suan;
            if (isset($request->data->icon)) {
                if (isset($channel['icon'])) {
                    unlink($channel['icon']);
                }
                $icon_name = permalink($request->data->name) . '.jpg';
                ImageDownload($request->data->icon, $icon_name);
                $_POST['icon'] = 'icon/' . $icon_name;
            }
            $categories = $request->data->categories;
            if ($db->form_guncelle('channels', $request->data->id)) {
                $db->sil('channel_category', $request->data->id, 'channel_id');
                $_POST = array();
                if (is_array($categories) and count($categories) > 0) {
                    foreach ($categories as $cat) {
                        $_POST['category_id'] = $cat;
                        $_POST['channel_id'] = $request->data->id;
                        $db->form_ekle('channel_category');
                    }
                }
                echo prepare_json('Kanal Güncelleme Başarılı', 200, '');
            } else {
                echo prepare_json('Kanal Güncelleme Başarısız', 200, '');
            }
        } else {
            echo prepare_json($request->data->id . ' idli kanal bulunamadı!', 400);
        }
    } else {
        echo prepare_json('Kanal id boş olamaz!', 400);
    }
});
Router::post('/channels', function () use ($db, $request) {
    userAuth();
    $orderField = $request->orderField ? $request->orderField : 'id';
    $orderby = $request->orderby ? $request->orderby : 'DESC';
    $where = $request->where ? $request->where : '1=1';
    $days = $db->sec("*", "channels", $where, $orderField . ' ' . $orderby)->oku(false);
    if ($db->say) {
        echo prepare_json('', 200, $days);
    } else {
        echo prepare_json('Kanal bulunamadı!', 400);
    }
});


Router::get('/play/([0-9]+)', function ($site, $id) use ($db, $request) {
    header("Content-Type: text/html");

    if (isset($id)) {
        $channel = $db->sec("*", "channels", 'onay=1 and id=' . db::kontrol($id, 'int'))->oku();
        if ($db->say) {
            $html = '<html><head>
  <link href="https://vjs.zencdn.net/7.6.5/video-js.css" rel="stylesheet">
  <script src="https://vjs.zencdn.net/ie8/1.1.2/videojs-ie8.min.js"></script>
<style>* {margin:0px;padding:0px;}

#tv-player {
min-height: 80%;
min-width: 100%;
}
</style>
</head>
<body>
<video id="tv-player" class="video-js vjs-default-skin vjs-big-play-centered" controls  preload="auto" width="100%" height="100%"
 poster="//tvapi.yurttutan.net/' . $channel['icon'] . '" data-setup="{}">
 <source src="' . $channel['url'] . '" type="application/x-mpegURL">
     <p class="vjs-no-js">
      To view this video please enable JavaScript, and consider upgrading to a web browser that
      <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
    </p>
 </video>
  <script src=\'https://vjs.zencdn.net/7.6.5/video.js\'></script>
  <script>
   /* var player = videojs(\'tv-player\');
  var playAndFullscreen = document.getElementsByClassName(\'play-and-fullscreen\')[0];

  playAndFullscreen.addEventListener(\'click\', function(e) {
    e.preventDefault();
    player.play();
    player.requestFullscreen();
  }, false);*/
</script>
</body></html>';
            echo $html;
        } else {
            echo 'Kanal bulunamadı';
        }
    } else {
        echo $id . ' idli kanal bulunamadı!';
    }

});

Router::get('/adress-play/([a-zA-Z]+)', function ($adres,$url) use ($db, $request) {
    header("Content-Type: text/html");
    $html = '<html><head>
  <link href="https://vjs.zencdn.net/7.6.5/video-js.css" rel="stylesheet">
  <script src="https://vjs.zencdn.net/ie8/1.1.2/videojs-ie8.min.js"></script>
<style>* {margin:0px;padding:0px;}

#tv-player {
min-height: 80%;
min-width: 100%;
}
</style>
</head>
<body>
<video id="tv-player" class="video-js vjs-default-skin vjs-big-play-centered" controls  preload="auto" width="100%" height="100%"
 poster="" data-setup="{}">
 <source src="' . $url . '" type="application/x-mpegURL">
     <p class="vjs-no-js">
      To view this video please enable JavaScript, and consider upgrading to a web browser that
      <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
    </p>
 </video>
  <script src=\'https://vjs.zencdn.net/7.6.5/video.js\'></script>
  <script>
   /* var player = videojs(\'tv-player\');
  var playAndFullscreen = document.getElementsByClassName(\'play-and-fullscreen\')[0];

  playAndFullscreen.addEventListener(\'click\', function(e) {
    e.preventDefault();
    player.play();
    player.requestFullscreen();
  }, false);*/
</script>
</body></html>';
    echo $html;


});
Router::run();
