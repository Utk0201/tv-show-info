$(document).ready(function () {
    let form = document.querySelector('#tvShow');
    $("#details").hide();
    $("#basic-info").hide();
    let container = $("#details")[0];
    let infoContainer = $("#basic-info")[0];

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        // console.log(document.childNodes);
        let last = document.body.querySelector('img');
        if (last) {
            let allC = document.body.children;
            console.dir(allC);
            while (document.body.children.length > 2) {
                document.body.children[2].remove();
            }
            let newBasicInfo = document.createElement('div');
            newBasicInfo.setAttribute("id", "basic-info");
            document.body.appendChild(newBasicInfo);
            let newDetails = document.createElement('div');
            newDetails.setAttribute("id", "details");
            document.body.appendChild(newDetails);
            $("#details").hide();
            container = $("#details")[0];
            $("#basic-info").hide();
            infoContainer = $("#basic-info")[0];
        }
        let txt = form.elements.query.value;
        if (txt) {
            let config = { params: { q: txt } };
            const res = await axios.get(`http://api.tvmaze.com/singlesearch/shows`, config);
            let showName = document.createElement('h1');
            showName.setAttribute("id","heading");
            showName.innerText=`${res.data.name}`;
            infoContainer.appendChild(showName);
            console.log(res.data.name);
            makeImages(res);
            form.elements.query.value = '';
        }
        else {
            // console.log('type something');
        }
        $("#basic-info").show("fast");
        $("#details").show("slow");
    })

    function makeImages(res) {
        // console.dir(res.data.genres);
        let basicInfo = document.getElementById("basic-info");
        let newImg = document.createElement('img');
        newImg.setAttribute("alt","Image not available for this show");
        if (res.data.image) {
            let imgUrl = res.data.image.medium;
            newImg.src = imgUrl;
            basicInfo.appendChild(newImg);
            // console.log('image inserted');
            //insert genres
            let ar =res.data.genres;
            insertH2(ar);
            //insert genres

            //insert schedule as per time zone of particular country
            // console.dir(res);
            let days = res.data.schedule.days;
            let time = res.data.schedule.time;
            let ctr = res.data.network.country.name;
            let tmz = res.data.network.country.timezone;
            let smr = res.data.summary;
            // console.dir(res.data.summary);
            console.log(tmz);
            insertScd(days, time, ctr, tmz, smr);
            //insert schedule
        }
        else {
            // console.log('no result found');
        }
    }

    function insertH2(ar) {
        // console.dir(ar);
        let basicInfo = document.getElementById("basic-info");
        let s = 'Genres : ';
        for (let i = 0; i < ar.length; i++) {
            if(i==ar.length-1){
                s=s+','+ar[i];
            }
            else{
                s+=ar[i];
            }
        }
        console.log(s);
        let h2 = document.createElement('h2');
        h2.innerHTML = `${s}`;
        basicInfo.appendChild(h2);
    }

    function insertScd(days, time, ctr, tmz, smr) {
        // console.log(container);
        let dh3 = document.createElement('h3');
        let th3 = document.createElement('h3');
        let ch3 = document.createElement('h3');
        let tmzh3 = document.createElement('h3');
        let smrp = document.createElement('p');
        //Inserting days
        let sdh3 = 'Days: ';
        let dIns = false;
        for (let i = 0; i < days.length; i++) {
            if (dIns) {
                sdh3 = sdh3 + ',' + days[i];
            }
            else {
                sdh3 += days[i];
                dIns = true;
            }
        }
        dh3.innerHTML = `${sdh3}`;
        container.appendChild(dh3);
        //Inserting days

        //inserting time
        th3.innerHTML = `Time: ${time} <span>as per Timezone : ${tmz}</span>`;
        container.appendChild(th3);
        //inserting time

        //inserting country
        ch3.innerHTML = `Country: ${ctr}`;
        container.appendChild(ch3);
        //inserting country

        //insert summary
        smrp.innerHTML = `${smr}`;
        container.appendChild(smrp);
        //insert summary
    }
});
