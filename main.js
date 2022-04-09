//変数の初期化
let typed = '';
let untyped = '';
let score = 0; //初期スコアは0点

//HTML要素の取得
const typedfield = document.getElementById('typed');
const untypedfield = document.getElementById('untyped');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');

//テキストを配列に格納
const textLists = [
    'JavaScript','HTML','CSS','HTML/CSS','PhotoShop','illustrator',
    'Figma','WordPress','Visual Studio Code','DreamWeaver','PHP',
    'Laravel','CakePHP','Symphony','Java','Ruby','Ruby on Rails',
    'Python','GO','Kotlin','Swift','C#','C++','Google Chrome','R',
    'Spring Framework','Angular.js','Vue.js','React','Bootstrap','Django',
    'git commit -m','git add .','git status','mkdir programming',
    'touch index.html','stylesheet','script','<?php ?>','MySQL',
    'front-page.php','index.php','home.php','archive.php','category.php',
    'singular.php','single.php','page.php','taxonomy.php','search.php',
    '404.php','get_template_directory_uri','has_post_thumbnail',
    'MW WP Form','wp-content','wp-admin','WP Multibyte Patch',
    '<?php get_footer(); ?>','functions.php','jQuery','wp_enqueue_script',
    '<?php get_header(); ?>','background-color','document.getElementById',
    'ECMAScript','DOM','Document Object Model','getElementsByClassName',
    'AWSCloud9','package.json','padding','margin','SyntaxError','XAMPP',
    'docker','cd programming','HTTP','HyperText Transfer Protocol',
    'MariaDB','console.log','return','ASP.NET','localhost','GitHub',
    'stack overflow','transition: all 0.3s;','$price = 1000;',
    'var let const','if elseif else','$i=1; $i<5; $i++','nth-of-type',
    'list-style-type: none;','transform: rotate(45deg);','width height',
    '@charset "UTF-8";','font-family','Hiragino Kaku Gothic ProN','a:link',
    'a:visited','a:hover','a:active','::before ::after','Masonry',
    'position: absolute; top:0; left:0;','placeholder="name"','echo',
    '@media(max-width:767px)','$_POST','$product = new Product;','$this',
    '__construct()','constructor()','Math.floor()','Math.random()',
    'object.key','const hello = () => {}','function hello()','NodeList',
    'HTMLcollection','switch() { case: break; }','addEventListener',
    'style.css','require_once','$this->name','git checkout main','Composer',
    'php artisan migrate', 'alias sail = "./vendor/bin/sail"','CRUD',
    'index.blade.php','unsigned()','save()','@auth','@component','@yield',
    'Qiita','Math.cell()','Hypertext Preprocessor','undefined null NaN',
    'for while if switch','Internet Protocol Address','IoT','CMS',
    'use strict;','git checkout -b new_branch','git merge new_branch',
    'git branch -a','git log','git init','reset.css','Model View Controller',
    'MVC','MVP','Minimum Viable Product','compact()','@keyframes',
    'setTimeout()','`${score}point!`','"Hello!{$name}"',"true false",
    'git remote add origin','git branch -M main','background',
    'git remote -v','git push -u origin main','#c7000b','#00873c'
]

// ランダムなテキストを表示
const createText = () => {
    
    // 正タイプした文字列をクリア
    typed = '';
    typedfield.textContent = typed;
    
    let random = Math.floor(Math.random() * textLists.length);
    untyped = textLists[random];

    //untypedのHTML要素を取得し、untypedにテキストを追加する
    //untypedに代入して画面に表示する
    untypedfield.textContent = untyped;
};

// キー入力の判定
const keyPress = e => {
    
    //誤タイプの場合
    if (e.key !== untyped.substring(0,1)){
        wrap.classList.add('typo');
        //100ミリ秒後に背景色を元に戻す
        setTimeout( () => {
            wrap.classList.remove('typo');
        }, 100);
        return;
    }
    //正タイプの場合
    score++; //scoreを1点加算(インクリメント)
    wrap.classList.remove('typo');
    typed += untyped.substring(0,1);
    untyped = untyped.substring(1);
    typedfield.textContent = typed;
    untypedfield.textContent = untyped;

    // テキストがなくなったら新しいテキストを表示
    if(untyped === '') {
    createText();
    }
};
// タイピングスキルのランクを判定
const rankCheck = score => {
    if(score < 40) {
        text = `あなたのランクはEです。\nコツコツがんばりましょう!\nDランクまであと${40 - score}文字です。`;
    }else if(score < 80) {
        text = `あなたのランクはDです。\nまだまだこれからです!\nCランクまであと${80 - score}文字です。`;
    }else if(score < 120) {
        text = `あなたのランクはCです。\nもっと上を目指しましょう!\nBランクまであと${120 - score}文字です。`;
    }else if(score < 160) {
        text = `あなたのランクはBです。\n早さと正確さを高めましょう!\nAランクまであと${160 - score}文字です。`;
    }else if(score < 200) {
        text = `あなたのランクはAです。\nSランク目指してFight!\nSランクまであと${200 - score}文字です。`;
    }else if(score < 250) {
        text = `あなたのランクはSです。\nおめでとうございます!\nしかし実はまだ上のランクがあります。`;
    }else if(score < 300) {
        text = `あなたのランクはスーパースターです。\n素晴らしいです!\nしかし、まだ上のランクがあります。`;
    }else if(score >= 350) {
        text = `あなたのランクはゴッドハンドです。\n本当におめでとうございます!!`;
    }
       // 生成したメッセージと一緒に文字列を返す
    return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};
// ゲームを終了
const gameOver = id => {
    clearInterval(id);
    const result = confirm(rankCheck(score));

    // OKボタンをクリックされたらリロードする
    if(result == true) {window.location.reload()}
};

// カウントダウンタイマー（timer関数）
const timer = () => {
    let time = 60;  //初期タイムが60秒

    const id = setInterval( () => {
        if(time <= 0) {
            gameOver(id);
        }
        count.textContent = time--; //1000ミリ秒の間隔でカウントダウンする
    }, 1000);
};

start.addEventListener('click', () => {
    //timer関数を呼ぶ(カウントダウンタイマー)
    timer();
    //ランダムなテキストを表示
    createText();
    //スタートボタンを非表示
    start.style.display = 'none';
    //キー入力イベント
    document.addEventListener('keypress', keyPress);
});

untypedfield.textContent = 'スタートボタンで開始';





