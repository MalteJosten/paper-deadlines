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

                let timeDiff = date.getTime() - new Date().getTime();
                let daysLeftValue = Math.round(timeDiff / (1000 * 3600 * 24));
                let weeksLeftValue = (daysLeftValue / 7).toFixed(1);
                let monthsLeftValue = (daysLeftValue / 30).toFixed(1);

                const daysLeft = document.createElement("p");
                daysLeft.classList.add("time-left", "daysLeft", "show");
                daysLeft.innerText = daysLeftValue;
                const weeksLeft = document.createElement("p");
                weeksLeft.classList.add("time-left", "weeksLeft", "hide");
                weeksLeft.innerText = weeksLeftValue;
                const monthsLeft = document.createElement("p");
                monthsLeft.classList.add("time-left", "monthsLeft", "hide");
                monthsLeft.innerText = monthsLeftValue;

                dlDiv.appendChild(daysLeft);
                dlDiv.appendChild(weeksLeft);
                dlDiv.appendChild(monthsLeft);

                const switches = document.createElement("ul");
                switches.classList.add("time-switch-group");
                const switchItem = document.createElement("li");
                const timeSwitch = document.createElement("button");
                timeSwitch.classList.add("time-display-switch");

                const switchLabels = ["days", "weeks", "months"];

                for (let idx in switchLabels) {
                    const switchButton = timeSwitch.cloneNode(true);
                    switchButton.innerHTML = switchLabels[idx];
                    switchButton.addEventListener("click", function() {changeTimeLeft(switchLabels[idx], dlDiv, switches)});
                    if (switchLabels[idx] == "days") {
                        switchButton.classList.add("active");
                    } else {
                        switchButton.classList.add("inactive");
                    }

                    const switchListItem = switchItem.cloneNode(true);
                    switchListItem.appendChild(switchButton);

                    switches.appendChild(switchListItem);
                }

                dlDiv.appendChild(switches);
                dlDiv.appendChild(dlDate);
                dlDiv.appendChild(desc);

                dls.appendChild(dlDiv);
            }

            div.appendChild(dls)
        }
    });

function changeTimeLeft(selection, timerParentNode, switchGroup) {
    let timerChildren = timerParentNode.children;

    for (let idx in timerChildren) {
        let child = timerChildren[idx];

        if (child.classList) {
            if (child.classList.contains("time-left")) {
                if (child.classList.contains(selection + "Left")) {
                    child.classList.remove("hide");
                    child.classList.add("show");
                } else {
                    child.classList.remove("show");
                    child.classList.add("hide");
                }
            }
        }
    }

    let switches = switchGroup.children;

    for (let idx = 0; idx < switches.length; idx++) {
        labelSwitch = switches[idx].children[0];
        if (labelSwitch.innerHTML == selection) {
            labelSwitch.classList.remove("inactive");
            labelSwitch.classList.add("active");
        } else {
            labelSwitch.classList.remove("active");
            labelSwitch.classList.add("inactive");
        }
    }
}
