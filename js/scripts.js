const counters = document.getElementById("counters");

const divider = document.createElement("div");
divider.classList.add("divider");

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


fetch("../data/conferences.json")
    .then((response) => response.json())
    .then((confData) => {
        for (let confId in confData.conferences) {
            let conference = confData.conferences[confId];

            const div = document.createElement("div");
            div.classList.add("conf-div");

            const pAbbrv = document.createElement("h2");
            pAbbrv.classList.add("conf-abbrv");
            const abbrv = document.createTextNode(confId);
            pAbbrv.appendChild(abbrv);
            div.appendChild(pAbbrv);

            const confTitle = document.createElement("p");
            confTitle.classList.add("conf-title");
            const spanSociety = document.createElement("span");
            spanSociety.classList.add("society");
            spanSociety.innerText = conference.society;
            confTitle.appendChild(spanSociety);
            confTitle.appendChild(document.createTextNode(conference.name));
            div.appendChild(confTitle);

            counters.appendChild(div);

            const link = document.createElement("a");
            link.classList.add("conf-link");
            link.href = conference.link;
            link.target = "_blank";
            link.innerText = "website";
            div.appendChild(link);

            div.appendChild(divider.cloneNode(true));
    
            const dls = document.createElement("div");
            dls.classList.add("dls");

            for (let dId in conference.deadlines) {
                const dlDiv = document.createElement("div");
                dlDiv.classList.add("dl-wrapper");

                let dl = conference.deadlines[dId];
                const date = new Date(dl.date);
                let month = "0" + (date.getMonth()+1);
                month = month.substring(month.length - 2);
                let day = "0" + date.getDate();
                day = day.substring(day.length - 2);
                const dateString = date.getFullYear() + "-" + month + "-" + day + " ("+ weekdays[date.getDay()] + ")";

                const dlDate = document.createElement("p");
                dlDate.classList.add("dl-date");
                dlDate.innerText = dateString;

                const desc = document.createElement("p");
                desc.classList.add("deadline-desc");
                desc.innerText = dl.desc;

                const daysLeft = document.createElement("p");
                daysLeft.classList.add("days-left");
                daysLeft.innerText = "XX";

                dlDiv.appendChild(daysLeft);
                dlDiv.appendChild(dlDate);
                dlDiv.appendChild(desc);

                dls.appendChild(dlDiv);
            }

            div.appendChild(dls)
        }
    });
