    //Your URL
    const URL = '';
   
    function init(){
        //get请求（用js原生，也不用ajax）
        var xhr = new XMLHttpRequest();
        xhr.open('get',URL + '/get.php',true);
        xhr.send();
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                var data = JSON.parse(xhr.responseText);
                $str = '';
                for(const key in data){
                    $str += `<li onclick="copy('`+ data[key] +`')" id="`+ key +`"><div><h2>`+ key +`</h2><p>`+ data[key] +`</p><div>`;
                    $str += `<button class="delete-button" name=`+ key +` onclick="deleteItem(this.name)">删除</button></li>`;
                }
                document.getElementById('list').innerHTML = $str;
                
            }
        }
        document.getElementById('newName').value = '';
        document.getElementById('newSecret').value = '';
        document.getElementById('qrimg').src = '';
        
    }
    function deleteItem(button) {
        //二次确认，列一个简单计算题
        var num1 = Math.floor(Math.random()*20);
        var num2 = Math.floor(Math.random()*20);
        var num3 = prompt('请输入'+ num1 + '+' + num2 + '=');
        if(num3 != num1 + num2){
            alert('计算错误');
            return;
        }
        //二次确认，需要输入相同的名字
        var name = prompt('请输入要删除的名称：'+ button );
        if(name != button){
            alert('名字不一致');
            return;
        }
        
        var xhr = new XMLHttpRequest();
        //post请求
        xhr.open('post',URL + '/del.php',true);
        xhr.send(JSON.stringify({name:button}));
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                var data = JSON.parse(xhr.responseText);
                if(data.code == 200){
                    document.getElementById(button).remove();
                }else{
                    alert('error');
                }
            }
        }
         
    }

    function getQR(){
        let name = document.getElementById('newName').value;
        let secret = document.getElementById('newSecret').value;
        name1 = encodeURIComponent(name);
        let url = 'otpauth://totp/' + name1  + '?secret=' + secret;
        document.getElementById('qrimg').src = 'https://api.pwmqr.com/qrcode/create/?url=' + encodeURIComponent(url);
        //写一个promise，等待图片加载完成
        let promise = new Promise(function(resolve,reject){
            document.getElementById('qrimg').onload = function(){
                resolve();
            }
        });
        promise.then(function(){
            var r = confirm('是否添加？');
            if(r == true){
                r = confirm('请确认已备份到Google Authenticator？');
                if(r == true){
                    submit(name,secret);
                }
            }
        });
     
        
    }

    function submit(name,secret){
        xhr = new XMLHttpRequest();
        xhr.open('post',URL + '/add.php',true);
        xhr.send(JSON.stringify({name:name,secret:secret}));
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                var data = JSON.parse(xhr.responseText);
                if(data.code == 200){
                    closeModal();
                    init();
                }else{
                    alert('error');
                    closeModal();
                }
            }
        }
    }

    function copy(text) {
        var input = document.createElement('textarea');
        input.textContent = text; // 或者 input.value = text;
        input.setAttribute('readonly', ''); // 设置为只读，以确保在移动光标时不会被删除
        input.style.position = 'absolute';
        input.style.left = '-9999px'; // 将元素定位到屏幕之外
        document.body.appendChild(input);
        input.select();
       if (document.execCommand('copy')) {
           document.execCommand('copy');
           alert('复制成功');
         }
        document.body.removeChild(input);
    }
    
    
    

    function openModal() {
        // 获取弹窗元素和遮罩层元素
        var modal = document.querySelector('.modal');
        var overlay = document.getElementById('overlay');
      
        // 显示弹窗和遮罩层
        modal.style.display = 'block';
        overlay.style.display = 'flex'; // 使用 flex 布局来居中显示
      
        // 禁用背景滚动
        document.body.style.overflow = 'hidden';
    }
    function closeModal() {
        // 获取弹窗元素和遮罩层元素
        var modal = document.querySelector('.modal');
        var overlay = document.getElementById('overlay');
        
        // 隐藏弹窗和遮罩层
        modal.style.display = 'none';
        overlay.style.display = 'none';
        
        // 启用背景滚动
        document.body.style.overflow = 'auto';
    }
          