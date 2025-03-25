$(document).ready(function () {
    $("#loadData").click(function () {
        $.ajax({
            url: "data.json",
            dataType: "json",
            success: function (data) {
                $("#output").empty(); 
                data.forEach(function (pokemon) {
                    let card = $("<div>").addClass("pokemon-card")
                        .append(`<h3>${pokemon.Name}</h3>`)
                        .append(`<p>Type: ${pokemon.Type}</p>`)
                        .append(`<p>HP: ${pokemon.HP}</p>`)
                        .append(`<p>Attack: ${pokemon.Attack}</p>`)
                        .append(`<p>Defense: ${pokemon.Defense}</p>`)
                        .append(`<p>Special Attack: ${pokemon.SpecialAttack}</p>`)
                        .append(`<p>Special Defense: ${pokemon.SpecialDefense}</p>`)
                        .append(`<p>Speed: ${pokemon.Speed}</p>`)
                        .append(`<p>Base Stat Total: ${pokemon.BaseStatTotal}</p>`);
                    
                    card.applyEffect(); 
                    $("#output").append(card);
                });
            },
            error: function () {
                $("#output").html("<p>Error loading data.</p>");
            }
        });
    });
});

$.fn.applyEffect = function () {
    return this.each(function () {
        let type = $(this).find("p:first").text().split(": ")[1];

        let colors = {
            "Normal": "lightpink",
            "Water": "lightblue",
            "Normal/Psychic": "pink",
            "Fire/Psychic": "magenta",
            "Fire/Dark": "red"
        };

        $(this).css("background-color", colors[type] || "gray");
    });
};