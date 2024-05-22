const counters = document.getElementById("counters");

fetch("../data/conferences.json")
    .then((response) => response.json())
    .then((confData) => {
        for (let confId in confData.conferences) {
            conference = confData.conferences[confId];
            console.log(conference)

            const div = document.createElement("div");

            const pAbbrv = document.createElement("h3");
            const abbrv = document.createTextNode(confId);
            pAbbrv.appendChild(abbrv);
            div.appendChild(pAbbrv);

            const pName = document.createElement("p");
            const spanSociety = document.createElement("span");
            spanSociety.innerText = conference.society;
            const name = document.createTextNode(conference.name);
            pName.appendChild(spanSociety);
            pName.appendChild(name);
            div.appendChild(pName);

            counters.appendChild(div);
        }
    });
