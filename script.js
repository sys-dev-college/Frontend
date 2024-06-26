// import './Download-File-JS-master/src/download'

// document.getElementById('reset-password-form').addEventListener('submit', function(event) {
//     event.preventDefault();

//     const newPassword = document.getElementById('new-password').value;
//     var params = window
//         .location
//         .search
//         .replace('?','')
//         .split('&')
//         .reduce(
//             function(p,e){
//                 var a = e.split('=');
//                 p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
//                 return p;
//                 },
//             {}
//         );

// console.log( params['v']);

//     fetch('it-fits.ru/api/users/document/', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             alert('Ваш пароль был успешно сброшен.');
//         } else {
//             alert('Произошла ошибка: ' + data.message);
//         }
//     })
//     .catch((error) => {
//         console.error('Ошибка:', error);
//         alert('Произошла ошибка при отправке запроса.');
//     });
// });


document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.addEventListener('click', function() {
      fetch('it-fits.ru/api/users/document/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка скачивания файла');
        }
        // Получаем заголовок с именем файла
        const contentDisposition = response.headers.get('Content-Disposition');
        let filename = 'downloaded_file';
        if (contentDisposition) {
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(contentDisposition);
          if (matches && matches[1]) {
            filename = matches[1].replace(/['"]/g, '');
          }
        }
        // Конвертируем ответ в Blob
        return response.blob().then(blob => ({
          blob,
          filename,
        }));
      })
      .then(({ blob, filename }) => {
        // Создаем ссылку для скачивания
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('Ошибка:', error);
        // Обработка ошибок при скачивании файла
      });
    });
  });