import './library/jquery.js';

$.ajax({
    type: "get",
    url: "../interface/getData.php",
    dataType: "json",
    success: function(res) {
        // console.log(res);
        let temp = '';
        res.forEach((elm, i) => {
            let picture = JSON.parse(elm.picture);
            // console.log(picture);
            temp += `<li class="public-li-size ">
            <a href="./details.html?id=${elm.id}">
                <div class="public-img-div ">
                    <img src="${picture[0].src} " alt=" " class=" public-img-size lazy">
                </div>
                <h3 class="public-title-h3 "> ${elm.title.slice(0,60)}</h3>
                <p class="public-title-p ">${elm.introduce}</p>
                <p>
                    <span>${elm.price}</span>

                </p>
            </a>
        </li>`;
        });
        $('.phone>.box-bd .col-md-9>.rendering').append(temp);
    }
});