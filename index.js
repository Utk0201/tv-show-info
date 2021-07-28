let ip=document.querySelector('#showName');
let form=document.querySelector('#tvShow');

form.addEventListener('submit',async function(e){
    e.preventDefault();
    let last=document.body.querySelector('img');
    if(last){
        let allC=document.body.children;
        console.dir(allC);
        for(let i=0;i<=6;i++){
            try{
                allC[3].remove();
            }
            catch{
                console.log('error at i = ',i);
            }
        }
    }
    let txt=form.elements.query.value;
    if(txt){
    let config={params:{q:txt}};
    const res= await axios.get(`http://api.tvmaze.com/singlesearch/shows`,config);
    makeImages(res);
    form.elements.query.value='';
    }
    else{
        console.log('type something');
    }
})

function makeImages(res){
    // console.dir(res.data.genres);
    let newImg=document.createElement('img');
    if(res.data.image){
    let imgUrl=res.data.image.medium;
    newImg.src=imgUrl;
    document.body.appendChild(newImg);
    console.log('image inserted');
    //insert genres
    let ar=res.data.genres;
    insertH2(ar);
    //insert genres

    //insert schedule as per time zone of particular country
    // console.dir(res);
    let days=res.data.schedule.days;
    let time=res.data.schedule.time;
    let ctr=res.data.network.country.name;
    let tmz=res.data.network.country.timezone;
    let smr=res.data.summary;
    // console.dir(res.data.summary);
    // console.log(tmz);
    insertScd(days,time,ctr,tmz,smr);
    //insert schedule

    }
    else{
        console.log('no result found');
    }
}

function insertH2(ar){
    // console.dir(ar);
    let s='';
    for(let i=0;i<ar.length;i++){
        if(s.length){
            s=s+','+ar[i];
        }
        else{
            s=ar[i];
        }
    }
    // console.log(s);
    let h2=document.createElement('h2');
    h2.innerHTML=`<i>${s}</i>`;
    document.body.appendChild(h2);
}

function insertScd(days,time,ctr,tmz,smr){
    let dh3=document.createElement('h3');
    let th3=document.createElement('h3');
    let ch3=document.createElement('h3');
    let tmzh3=document.createElement('h3');
    let smrp=document.createElement('p');
    //Inserting days
    let sdh3='Days: ';
    let dIns=false;
    for(let i=0;i<days.length;i++){
        if(dIns){
            sdh3=sdh3+','+days[i];
        }
        else{
            sdh3+=days[i];
            dIns=true;
        }
    }
    dh3.innerHTML=`<b>${sdh3}</b>`;
    document.body.appendChild(dh3);
    //Inserting days

    //inserting time
    th3.innerHTML=`<b>Time: ${time}</b> <span><b>as per Timezone : ${tmz}</b></span>`;
    document.body.appendChild(th3);
    //inserting time
    
    //inserting country
    ch3.innerHTML=`<b>Country: ${ctr}</b>`;
    document.body.appendChild(ch3);
    //inserting country

    //insert summary
    smrp.innerHTML=`<b>${smr}</b>`;
    document.body.appendChild(smrp);
    //insert summary
}