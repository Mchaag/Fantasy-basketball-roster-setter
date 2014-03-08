describe("EspnRosterSetter", function () {
    describe("basic roster move tests", function () {
        var rosterInit = {"PG":{"id":622,"name":"Stephen Curry","isHealthy":true,"positions":["PG","SG","G","Util_0","Util_1","Util_2"],"hasGame":true},"SG":null,"SF":null,"PF":{"id":843,"name":"Kenneth Faried","isHealthy":false,"positions":["PF","F","Util_0","Util_1","Util_2"],"hasGame":false},"C":{"id":512,"name":"Nikola Pekovic","isHealthy":true,"positions":["C","Util_0","Util_1","Util_2"],"hasGame":false},"G":null,"F":{"id":627,"name":"Tyreke Evans","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":false},"Util_0":{"id":963,"name":"Harrison Barnes","isHealthy":true,"positions":["SF","F","Util_0","Util_1","Util_2"],"hasGame":true},"Util_1":{"id":317,"name":"David Lee","isHealthy":true,"positions":["PF","C","F","Util_0","Util_1","Util_2"],"hasGame":true},"Util_2":{"id":629,"name":"Taj Gibson","isHealthy":true,"positions":["PF","F","Util_0","Util_1","Util_2"],"hasGame":true},"Benches":[{"id":991,"name":"Damian Lillard","isHealthy":true,"positions":["PG","G","Util_0","Util_1","Util_2"],"hasGame":true},{"id":426,"name":"Joakim Noah","isHealthy":true,"positions":["C","Util_0","Util_1","Util_2"],"hasGame":true},{"id":265,"name":"Andre Iguodala","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":true},{"id":634,"name":"Gerald Henderson","isHealthy":true,"positions":["SG","G","Util_0","Util_1","Util_2"],"hasGame":false},{"id":722,"name":"Avery Bradley","isHealthy":true,"positions":["PG","SG","G","Util_0","Util_1","Util_2"],"hasGame":true},{"id":310,"name":"Danny Granger","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":true}]};
        var rs;

        beforeEach(function() {
            rs = new EspnRosterSetter(rosterInit, true);
        });

        describe("move logic", function () {
            it("should be able to move an active bench slot to an empty active slot", function () {
                // Avery Bradley
                var src = rs.roster.Benches[4];
                var dst = 'SG';
                expect(rs.freeAndMove(src, dst)).toEqual([
                    ["Avery Bradley", 722, "Benches", "SG"]
                ]);
                var resultRoster = {"PG":{"id":622,"name":"Stephen Curry","isHealthy":true,"positions":["PG","SG","G","Util_0","Util_1","Util_2"],"hasGame":true},"SG":{"id":722,"name":"Avery Bradley","isHealthy":true,"positions":["PG","SG","G","Util_0","Util_1","Util_2"],"hasGame":true},"SF":null,"PF":{"id":843,"name":"Kenneth Faried","isHealthy":false,"positions":["PF","F","Util_0","Util_1","Util_2"],"hasGame":false},"C":{"id":512,"name":"Nikola Pekovic","isHealthy":true,"positions":["C","Util_0","Util_1","Util_2"],"hasGame":false},"G":null,"F":{"id":627,"name":"Tyreke Evans","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":false},"Util_0":{"id":963,"name":"Harrison Barnes","isHealthy":true,"positions":["SF","F","Util_0","Util_1","Util_2"],"hasGame":true},"Util_1":{"id":317,"name":"David Lee","isHealthy":true,"positions":["PF","C","F","Util_0","Util_1","Util_2"],"hasGame":true},"Util_2":{"id":629,"name":"Taj Gibson","isHealthy":true,"positions":["PF","F","Util_0","Util_1","Util_2"],"hasGame":true},"Benches":[{"id":991,"name":"Damian Lillard","isHealthy":true,"positions":["PG","G","Util_0","Util_1","Util_2"],"hasGame":true},{"id":426,"name":"Joakim Noah","isHealthy":true,"positions":["C","Util_0","Util_1","Util_2"],"hasGame":true},{"id":265,"name":"Andre Iguodala","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":true},{"id":634,"name":"Gerald Henderson","isHealthy":true,"positions":["SG","G","Util_0","Util_1","Util_2"],"hasGame":false},{"id":310,"name":"Danny Granger","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":true}]};
                expect(rs.roster).toEqual(resultRoster);
            });

            it("shouldn't be able to move players to the bench whether they are active or inactive", function () {
                // Tyreke evans, inactive
                var src1 = rs.roster.F;
                // Step curry, active
                var src2 = rs.roster.PG;
                var dst = 'Benches';
                expect(rs.freeAndMove(src1, dst)).toEqual([]);
                expect(rs.freeAndMove(src2, dst)).toEqual([]);
                var resultRoster = rosterInit;
                expect(rs.roster).toEqual(resultRoster);
            });

            it("should be able to move players within active slots", function () {
                // TODO: Might be worth looping kenneth farried around too. He's inactive while curry is active
                // Loop Steph curry around
                var src = rs.roster.PG;
                var dst = 'SG';
                expect(rs.freeAndMove(src, dst)).toEqual([["Stephen Curry",622,"PG","SG"]] );
                expect(rs.roster).toEqual({"PG":null,"SG":{"id":622,"name":"Stephen Curry","isHealthy":true,"positions":["PG","SG","G","Util_0","Util_1","Util_2"],"hasGame":true},"SF":null,"PF":{"id":843,"name":"Kenneth Faried","isHealthy":false,"positions":["PF","F","Util_0","Util_1","Util_2"],"hasGame":false},"C":{"id":512,"name":"Nikola Pekovic","isHealthy":true,"positions":["C","Util_0","Util_1","Util_2"],"hasGame":false},"G":null,"F":{"id":627,"name":"Tyreke Evans","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":false},"Util_0":{"id":963,"name":"Harrison Barnes","isHealthy":true,"positions":["SF","F","Util_0","Util_1","Util_2"],"hasGame":true},"Util_1":{"id":317,"name":"David Lee","isHealthy":true,"positions":["PF","C","F","Util_0","Util_1","Util_2"],"hasGame":true},"Util_2":{"id":629,"name":"Taj Gibson","isHealthy":true,"positions":["PF","F","Util_0","Util_1","Util_2"],"hasGame":true},"Benches":[{"id":991,"name":"Damian Lillard","isHealthy":true,"positions":["PG","G","Util_0","Util_1","Util_2"],"hasGame":true},{"id":426,"name":"Joakim Noah","isHealthy":true,"positions":["C","Util_0","Util_1","Util_2"],"hasGame":true},{"id":265,"name":"Andre Iguodala","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":true},{"id":634,"name":"Gerald Henderson","isHealthy":true,"positions":["SG","G","Util_0","Util_1","Util_2"],"hasGame":false},{"id":722,"name":"Avery Bradley","isHealthy":true,"positions":["PG","SG","G","Util_0","Util_1","Util_2"],"hasGame":true},{"id":310,"name":"Danny Granger","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":true}]} );
                src = rs.roster.SG;
                dst = 'G';
                expect(rs.freeAndMove(src, dst)).toEqual([["Stephen Curry",622,"SG","G"]] );
                expect(rs.roster).toEqual({"PG":null,"SG":null,"SF":null,"PF":{"id":843,"name":"Kenneth Faried","isHealthy":false,"positions":["PF","F","Util_0","Util_1","Util_2"],"hasGame":false},"C":{"id":512,"name":"Nikola Pekovic","isHealthy":true,"positions":["C","Util_0","Util_1","Util_2"],"hasGame":false},"G":{"id":622,"name":"Stephen Curry","isHealthy":true,"positions":["PG","SG","G","Util_0","Util_1","Util_2"],"hasGame":true},"F":{"id":627,"name":"Tyreke Evans","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":false},"Util_0":{"id":963,"name":"Harrison Barnes","isHealthy":true,"positions":["SF","F","Util_0","Util_1","Util_2"],"hasGame":true},"Util_1":{"id":317,"name":"David Lee","isHealthy":true,"positions":["PF","C","F","Util_0","Util_1","Util_2"],"hasGame":true},"Util_2":{"id":629,"name":"Taj Gibson","isHealthy":true,"positions":["PF","F","Util_0","Util_1","Util_2"],"hasGame":true},"Benches":[{"id":991,"name":"Damian Lillard","isHealthy":true,"positions":["PG","G","Util_0","Util_1","Util_2"],"hasGame":true},{"id":426,"name":"Joakim Noah","isHealthy":true,"positions":["C","Util_0","Util_1","Util_2"],"hasGame":true},{"id":265,"name":"Andre Iguodala","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":true},{"id":634,"name":"Gerald Henderson","isHealthy":true,"positions":["SG","G","Util_0","Util_1","Util_2"],"hasGame":false},{"id":722,"name":"Avery Bradley","isHealthy":true,"positions":["PG","SG","G","Util_0","Util_1","Util_2"],"hasGame":true},{"id":310,"name":"Danny Granger","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":true}]} );
                src = rs.roster.G;
                dst = 'PG';
                expect(rs.freeAndMove(src, dst)).toEqual([["Stephen Curry",622,"G","PG"]]  );
                var resultRoster = rosterInit;
                expect(rs.roster).toEqual(resultRoster);
            });

            it("shouldn't be able to move a player to its own position", function () {
                // Steph Curry
                var src = rs.roster.PG;
                var dst = 'PG';
                expect(rs.freeAndMove(src, dst)).toEqual([]);
                expect(rs.roster).toEqual(rosterInit);
            });
        });

        describe("swap logic", function(){
            it("can swap an active bench player with an inactive player in an active slot", function () {
                // Tyreke evans(inactive) to SG
                expect(rs.freeAndMove(rs.roster.F, 'SG')).toEqual([["Tyreke Evans",627,"F","SG"]]);
                // Iguodala to SG succeeds
                expect(rs.freeAndMove(rs.roster.Benches[2], 'SG')).toEqual(
                    [["Andre Iguodala",265,"Benches","SG"],["Tyreke Evans",627,"SG","Benches"]]
                );
                var resultRoster = {"PG":{"id":622,"name":"Stephen Curry","isHealthy":true,"positions":["PG","SG","G","Util_0","Util_1","Util_2"],"hasGame":true},"SG":{"id":265,"name":"Andre Iguodala","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":true},"SF":null,"PF":{"id":843,"name":"Kenneth Faried","isHealthy":false,"positions":["PF","F","Util_0","Util_1","Util_2"],"hasGame":false},"C":{"id":512,"name":"Nikola Pekovic","isHealthy":true,"positions":["C","Util_0","Util_1","Util_2"],"hasGame":false},"G":null,"F":null,"Util_0":{"id":963,"name":"Harrison Barnes","isHealthy":true,"positions":["SF","F","Util_0","Util_1","Util_2"],"hasGame":true},"Util_1":{"id":317,"name":"David Lee","isHealthy":true,"positions":["PF","C","F","Util_0","Util_1","Util_2"],"hasGame":true},"Util_2":{"id":629,"name":"Taj Gibson","isHealthy":true,"positions":["PF","F","Util_0","Util_1","Util_2"],"hasGame":true},"Benches":[{"id":991,"name":"Damian Lillard","isHealthy":true,"positions":["PG","G","Util_0","Util_1","Util_2"],"hasGame":true},{"id":426,"name":"Joakim Noah","isHealthy":true,"positions":["C","Util_0","Util_1","Util_2"],"hasGame":true},{"id":634,"name":"Gerald Henderson","isHealthy":true,"positions":["SG","G","Util_0","Util_1","Util_2"],"hasGame":false},{"id":722,"name":"Avery Bradley","isHealthy":true,"positions":["PG","SG","G","Util_0","Util_1","Util_2"],"hasGame":true},{"id":310,"name":"Danny Granger","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":true},{"id":627,"name":"Tyreke Evans","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":false}]};
                expect(rs.roster).toEqual(resultRoster);
            });
        });
    });

    describe("recursive move tests", function() {
        var rosterInit = {"PG":{"id":622,"name":"Stephen Curry","isHealthy":true,"positions":["PG","SG","G","Util_0","Util_1","Util_2"],"hasGame":true},"SG":null,"SF":null,"PF":{"id":843,"name":"Kenneth Faried","isHealthy":false,"positions":["PF","F","Util_0","Util_1","Util_2"],"hasGame":false},"C":{"id":512,"name":"Nikola Pekovic","isHealthy":true,"positions":["C","Util_0","Util_1","Util_2"],"hasGame":false},"G":null,"F":{"id":627,"name":"Tyreke Evans","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":false},"Util_0":{"id":963,"name":"Harrison Barnes","isHealthy":true,"positions":["SF","F","Util_0","Util_1","Util_2"],"hasGame":true},"Util_1":{"id":317,"name":"David Lee","isHealthy":true,"positions":["PF","C","F","Util_0","Util_1","Util_2"],"hasGame":true},"Util_2":{"id":629,"name":"Taj Gibson","isHealthy":true,"positions":["PF","F","Util_0","Util_1","Util_2"],"hasGame":true},"Benches":[{"id":991,"name":"Damian Lillard","isHealthy":true,"positions":["PG","G","Util_0","Util_1","Util_2"],"hasGame":true},{"id":426,"name":"Joakim Noah","isHealthy":true,"positions":["C","Util_0","Util_1","Util_2"],"hasGame":true},{"id":265,"name":"Andre Iguodala","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":true},{"id":634,"name":"Gerald Henderson","isHealthy":true,"positions":["SG","G","Util_0","Util_1","Util_2"],"hasGame":false},{"id":722,"name":"Avery Bradley","isHealthy":true,"positions":["PG","SG","G","Util_0","Util_1","Util_2"],"hasGame":true},{"id":310,"name":"Danny Granger","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":true}]};
        var rs;

        beforeEach(function() {
            rs = new EspnRosterSetter(rosterInit, true);

            // Pack the roster tightly
            // Avery Bradley to SG
            rs.freeAndMove(rs.roster.Benches[4], 'SG');
            // Danny Granger to SF
            rs.freeAndMove(rs.roster.Benches[4], 'SF');
            // Damian Lillard to G
            rs.freeAndMove(rs.roster.Benches[0], 'G');
        });

        it("can insert a bench player into an active slot if there's space in the active slots", function () {
            // Iguodala (active) to SF (currently active) w/ granger in it
            expect(rs.freeAndMove(rs.roster.Benches[1], 'SF')).toEqual(
                [["Harrison Barnes",963,"Util_0","F"],["Tyreke Evans",627,"F","Util_0"],["Damian Lillard",991,"G","Util_0"],["Tyreke Evans",627,"Util_0","G"],["Avery Bradley",722,"SG","G"],["Tyreke Evans",627,"G","SG"],["Danny Granger",310,"SF","SG"],["Tyreke Evans",627,"SG","SF"],["Andre Iguodala",265,"Benches","SF"],["Tyreke Evans",627,"SF","Benches"]]
            );
            expect(rs.roster).toEqual({"PG":{"id":622,"name":"Stephen Curry","isHealthy":true,"positions":["PG","SG","G","Util_0","Util_1","Util_2"],"hasGame":true},"SG":{"id":310,"name":"Danny Granger","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":true},"SF":{"id":265,"name":"Andre Iguodala","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":true},"PF":{"id":843,"name":"Kenneth Faried","isHealthy":false,"positions":["PF","F","Util_0","Util_1","Util_2"],"hasGame":false},"C":{"id":512,"name":"Nikola Pekovic","isHealthy":true,"positions":["C","Util_0","Util_1","Util_2"],"hasGame":false},"G":{"id":722,"name":"Avery Bradley","isHealthy":true,"positions":["PG","SG","G","Util_0","Util_1","Util_2"],"hasGame":true},"F":{"id":963,"name":"Harrison Barnes","isHealthy":true,"positions":["SF","F","Util_0","Util_1","Util_2"],"hasGame":true},"Util_0":{"id":991,"name":"Damian Lillard","isHealthy":true,"positions":["PG","G","Util_0","Util_1","Util_2"],"hasGame":true},"Util_1":{"id":317,"name":"David Lee","isHealthy":true,"positions":["PF","C","F","Util_0","Util_1","Util_2"],"hasGame":true},"Util_2":{"id":629,"name":"Taj Gibson","isHealthy":true,"positions":["PF","F","Util_0","Util_1","Util_2"],"hasGame":true},"Benches":[{"id":426,"name":"Joakim Noah","isHealthy":true,"positions":["C","Util_0","Util_1","Util_2"],"hasGame":true},{"id":634,"name":"Gerald Henderson","isHealthy":true,"positions":["SG","G","Util_0","Util_1","Util_2"],"hasGame":false},{"id":627,"name":"Tyreke Evans","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":false}]});
        });

        it("can't insert a bench player into an active slot if there's no space", function () {
            // Make every non-bench slot active and healthy
            var player;
            for (var key in rs.roster) {
                if (rs.roster.hasOwnProperty(key) && key !== 'Benches'){
                    player = rs.roster[key];
                    player.isHealthy = true;
                    player.hasGame = true;
                }
            }
            var untouchedRoster = jQuery.extend(true, {}, rs.roster);
            // Noah(active) swap with pekovic(active)
            expect(rs.freeAndMove(rs.roster.Benches[0], 'C')).toEqual([]);
            expect(rs.roster).toEqual(untouchedRoster);
        });
    });

    describe("generateRosterMoves tests", function(){
        it("will set all active players for a full bench", function() {
            var fullBench = {"PG":null,"SG":null,"SF":null,"PF":null,"C":null,"G":null,"F":null,"Util_0":null,"Util_1":null,"Util_2":null,"Benches":[{"id":629,"name":"Taj Gibson","isHealthy":true,"positions":["PF","F","Util_0","Util_1","Util_2"],"hasGame":true},{"id":317,"name":"David Lee","isHealthy":true,"positions":["PF","C","F","Util_0","Util_1","Util_2"],"hasGame":true},{"id":963,"name":"Harrison Barnes","isHealthy":true,"positions":["SF","F","Util_0","Util_1","Util_2"],"hasGame":true},{"id":310,"name":"Danny Granger","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":true},{"id":991,"name":"Damian Lillard","isHealthy":true,"positions":["PG","G","Util_0","Util_1","Util_2"],"hasGame":true},{"id":426,"name":"Joakim Noah","isHealthy":true,"positions":["C","Util_0","Util_1","Util_2"],"hasGame":true},{"id":265,"name":"Andre Iguodala","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":true},{"id":622,"name":"Stephen Curry","isHealthy":true,"positions":["PG","SG","G","Util_0","Util_1","Util_2"],"hasGame":true},{"id":722,"name":"Avery Bradley","isHealthy":true,"positions":["PG","SG","G","Util_0","Util_1","Util_2"],"hasGame":true},{"id":843,"name":"Kenneth Faried","isHealthy":false,"positions":["PF","F","Util_0","Util_1","Util_2"],"hasGame":false},{"id":634,"name":"Gerald Henderson","isHealthy":true,"positions":["SG","G","Util_0","Util_1","Util_2"],"hasGame":false},{"id":512,"name":"Nikola Pekovic","isHealthy":true,"positions":["C","Util_0","Util_1","Util_2"],"hasGame":false},{"id":627,"name":"Tyreke Evans","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":false}]};
            var rs = new EspnRosterSetter(fullBench, true);

            expect(rs.generateRosterMoves()).toEqual(
                [["Taj Gibson",629,"Benches","PF"],["David Lee",317,"Benches","C"],["Harrison Barnes",963,"Benches","SF"],["Danny Granger",310,"Benches","SG"],["Damian Lillard",991,"Benches","PG"],["Joakim Noah",426,"Benches","Util_0"],["Andre Iguodala",265,"Benches","F"],["Stephen Curry",622,"Benches","G"],["Avery Bradley",722,"Benches","Util_1"]]
            );

            // All active players started, but util_2 is empty
            var result = {"PG":{"id":991,"name":"Damian Lillard","isHealthy":true,"positions":["PG","G","Util_0","Util_1","Util_2"],"hasGame":true},"SG":{"id":310,"name":"Danny Granger","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":true},"SF":{"id":963,"name":"Harrison Barnes","isHealthy":true,"positions":["SF","F","Util_0","Util_1","Util_2"],"hasGame":true},"PF":{"id":629,"name":"Taj Gibson","isHealthy":true,"positions":["PF","F","Util_0","Util_1","Util_2"],"hasGame":true},"C":{"id":317,"name":"David Lee","isHealthy":true,"positions":["PF","C","F","Util_0","Util_1","Util_2"],"hasGame":true},"G":{"id":622,"name":"Stephen Curry","isHealthy":true,"positions":["PG","SG","G","Util_0","Util_1","Util_2"],"hasGame":true},"F":{"id":265,"name":"Andre Iguodala","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":true},"Util_0":{"id":426,"name":"Joakim Noah","isHealthy":true,"positions":["C","Util_0","Util_1","Util_2"],"hasGame":true},"Util_1":{"id":722,"name":"Avery Bradley","isHealthy":true,"positions":["PG","SG","G","Util_0","Util_1","Util_2"],"hasGame":true},"Util_2":null,"Benches":[{"id":843,"name":"Kenneth Faried","isHealthy":false,"positions":["PF","F","Util_0","Util_1","Util_2"],"hasGame":false},{"id":634,"name":"Gerald Henderson","isHealthy":true,"positions":["SG","G","Util_0","Util_1","Util_2"],"hasGame":false},{"id":512,"name":"Nikola Pekovic","isHealthy":true,"positions":["C","Util_0","Util_1","Util_2"],"hasGame":false},{"id":627,"name":"Tyreke Evans","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":false}]};
            expect(rs.roster).toEqual(result);
        });

        var singleInactive;
        it("will swap inactive players for active bench players", function () {
            // Faried @ Util_2 is only inactive starting player
            singleInactive = {"PG":{"id":991,"name":"Damian Lillard","isHealthy":true,"positions":["PG","G","Util_0","Util_1","Util_2"],"hasGame":true},"SG":{"id":310,"name":"Danny Granger","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":true},"SF":{"id":963,"name":"Harrison Barnes","isHealthy":true,"positions":["SF","F","Util_0","Util_1","Util_2"],"hasGame":true},"PF":{"id":629,"name":"Taj Gibson","isHealthy":true,"positions":["PF","F","Util_0","Util_1","Util_2"],"hasGame":true},"C":{"id":317,"name":"David Lee","isHealthy":true,"positions":["PF","C","F","Util_0","Util_1","Util_2"],"hasGame":true},"G":{"id":622,"name":"Stephen Curry","isHealthy":true,"positions":["PG","SG","G","Util_0","Util_1","Util_2"],"hasGame":true},"F":{"id":265,"name":"Andre Iguodala","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":true},"Util_0":{"id":426,"name":"Joakim Noah","isHealthy":true,"positions":["C","Util_0","Util_1","Util_2"],"hasGame":true},"Util_1":{"id":722,"name":"Avery Bradley","isHealthy":true,"positions":["PG","SG","G","Util_0","Util_1","Util_2"],"hasGame":true},"Util_2":{"id":843,"name":"Kenneth Faried","isHealthy":true,"positions":["PF","F","Util_0","Util_1","Util_2"],"hasGame":false},"Benches":[{"id":634,"name":"Gerald Henderson","isHealthy":true,"positions":["SG","G","Util_0","Util_1","Util_2"],"hasGame":false},{"id":512,"name":"Nikola Pekovic","isHealthy":true,"positions":["C","Util_0","Util_1","Util_2"],"hasGame":false},{"id":627,"name":"Tyreke Evans","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":false}]};
            var rs = new EspnRosterSetter(singleInactive, true);
            var henderson = rs.roster.Benches[0];
            henderson.hasGame = true;

            expect(rs.generateRosterMoves()).toEqual([["Gerald Henderson",634,"Benches","Util_2"],["Kenneth Faried",843,"Util_2","Benches"]]);
            expect(rs.roster).toEqual({"PG":{"id":991,"name":"Damian Lillard","isHealthy":true,"positions":["PG","G","Util_0","Util_1","Util_2"],"hasGame":true},"SG":{"id":310,"name":"Danny Granger","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":true},"SF":{"id":963,"name":"Harrison Barnes","isHealthy":true,"positions":["SF","F","Util_0","Util_1","Util_2"],"hasGame":true},"PF":{"id":629,"name":"Taj Gibson","isHealthy":true,"positions":["PF","F","Util_0","Util_1","Util_2"],"hasGame":true},"C":{"id":317,"name":"David Lee","isHealthy":true,"positions":["PF","C","F","Util_0","Util_1","Util_2"],"hasGame":true},"G":{"id":622,"name":"Stephen Curry","isHealthy":true,"positions":["PG","SG","G","Util_0","Util_1","Util_2"],"hasGame":true},"F":{"id":265,"name":"Andre Iguodala","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":true},"Util_0":{"id":426,"name":"Joakim Noah","isHealthy":true,"positions":["C","Util_0","Util_1","Util_2"],"hasGame":true},"Util_1":{"id":722,"name":"Avery Bradley","isHealthy":true,"positions":["PG","SG","G","Util_0","Util_1","Util_2"],"hasGame":true},"Util_2":{"id":634,"name":"Gerald Henderson","isHealthy":true,"positions":["SG","G","Util_0","Util_1","Util_2"],"hasGame":true},"Benches":[{"id":512,"name":"Nikola Pekovic","isHealthy":true,"positions":["C","Util_0","Util_1","Util_2"],"hasGame":false},{"id":627,"name":"Tyreke Evans","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":false},{"id":843,"name":"Kenneth Faried","isHealthy":true,"positions":["PF","F","Util_0","Util_1","Util_2"],"hasGame":false}]});
        });

        it("will make space for active bench player to start if there is room", function () {
            var rs = new EspnRosterSetter(singleInactive, true);
            var henderson = rs.roster.Benches[0];
            henderson.hasGame = true;
            // Swap gibson for faried
            rs._swapPlayers(rs.roster.PF, rs.roster.Util_2);

            expect(rs.generateRosterMoves()).toEqual(
                [["Taj Gibson",629,"Util_2","PF"],["Kenneth Faried",843,"PF","Util_2"],["Avery Bradley",722,"Util_1","Util_2"],["Kenneth Faried",843,"Util_2","Util_1"],["Joakim Noah",426,"Util_0","Util_1"],["Kenneth Faried",843,"Util_1","Util_0"],["Gerald Henderson",634,"Benches","Util_0"],["Kenneth Faried",843,"Util_0","Benches"]]
            );

            expect(rs.roster).toEqual({"PG":{"id":991,"name":"Damian Lillard","isHealthy":true,"positions":["PG","G","Util_0","Util_1","Util_2"],"hasGame":true},"SG":{"id":310,"name":"Danny Granger","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":true},"SF":{"id":963,"name":"Harrison Barnes","isHealthy":true,"positions":["SF","F","Util_0","Util_1","Util_2"],"hasGame":true},"PF":{"id":629,"name":"Taj Gibson","isHealthy":true,"positions":["PF","F","Util_0","Util_1","Util_2"],"hasGame":true},"C":{"id":317,"name":"David Lee","isHealthy":true,"positions":["PF","C","F","Util_0","Util_1","Util_2"],"hasGame":true},"G":{"id":622,"name":"Stephen Curry","isHealthy":true,"positions":["PG","SG","G","Util_0","Util_1","Util_2"],"hasGame":true},"F":{"id":265,"name":"Andre Iguodala","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":true},"Util_0":{"id":634,"name":"Gerald Henderson","isHealthy":true,"positions":["SG","G","Util_0","Util_1","Util_2"],"hasGame":true},"Util_1":{"id":426,"name":"Joakim Noah","isHealthy":true,"positions":["C","Util_0","Util_1","Util_2"],"hasGame":true},"Util_2":{"id":722,"name":"Avery Bradley","isHealthy":true,"positions":["PG","SG","G","Util_0","Util_1","Util_2"],"hasGame":true},"Benches":[{"id":512,"name":"Nikola Pekovic","isHealthy":true,"positions":["C","Util_0","Util_1","Util_2"],"hasGame":false},{"id":627,"name":"Tyreke Evans","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":false},{"id":843,"name":"Kenneth Faried","isHealthy":true,"positions":["PF","F","Util_0","Util_1","Util_2"],"hasGame":false}]});
        });

        it("will move in injured bench players with games if there's empty space", function() {
           // Faried has a game, but he's injured. He should still make it into roster because it has space
            var initRoster = {"PG":{"id":722,"name":"Avery Bradley","isHealthy":true,"positions":["PG","SG","G","Util_0","Util_1","Util_2"],"hasGame":true},"SG":{"id":634,"name":"Gerald Henderson","isHealthy":true,"positions":["SG","G","Util_0","Util_1","Util_2"],"hasGame":true},"SF":{"id":310,"name":"Danny Granger","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":true},"PF":{"id":629,"name":"Taj Gibson","isHealthy":true,"positions":["PF","F","Util_0","Util_1","Util_2"],"hasGame":true},"C":{"id":512,"name":"Nikola Pekovic","isHealthy":true,"positions":["C","Util_0","Util_1","Util_2"],"hasGame":true},"G":{"id":991,"name":"Damian Lillard","isHealthy":true,"positions":["PG","G","Util_0","Util_1","Util_2"],"hasGame":true},"F":{"id":627,"name":"Tyreke Evans","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":true},"Util_0":{"id":622,"name":"Stephen Curry","isHealthy":true,"positions":["PG","SG","G","Util_0","Util_1","Util_2"],"hasGame":false},"Util_1":{"id":426,"name":"Joakim Noah","isHealthy":true,"positions":["C","Util_0","Util_1","Util_2"],"hasGame":true},"Util_2":null,"Benches":[{"id":265,"name":"Andre Iguodala","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":false},{"id":963,"name":"Harrison Barnes","isHealthy":true,"positions":["SF","F","Util_0","Util_1","Util_2"],"hasGame":false},{"id":843,"name":"Kenneth Faried","isHealthy":false,"positions":["PF","F","Util_0","Util_1","Util_2"],"hasGame":true},{"id":317,"name":"David Lee","isHealthy":true,"positions":["PF","C","F","Util_0","Util_1","Util_2"],"hasGame":false}]};
            var rs = new EspnRosterSetter(initRoster, true);

            expect(rs.generateRosterMoves()).toEqual([["Kenneth Faried",843,"Benches","Util_0"],["Stephen Curry",622,"Util_0","Benches"]]);

            expect(rs.roster).toEqual({"PG":{"id":722,"name":"Avery Bradley","isHealthy":true,"positions":["PG","SG","G","Util_0","Util_1","Util_2"],"hasGame":true},"SG":{"id":634,"name":"Gerald Henderson","isHealthy":true,"positions":["SG","G","Util_0","Util_1","Util_2"],"hasGame":true},"SF":{"id":310,"name":"Danny Granger","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":true},"PF":{"id":629,"name":"Taj Gibson","isHealthy":true,"positions":["PF","F","Util_0","Util_1","Util_2"],"hasGame":true},"C":{"id":512,"name":"Nikola Pekovic","isHealthy":true,"positions":["C","Util_0","Util_1","Util_2"],"hasGame":true},"G":{"id":991,"name":"Damian Lillard","isHealthy":true,"positions":["PG","G","Util_0","Util_1","Util_2"],"hasGame":true},"F":{"id":627,"name":"Tyreke Evans","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":true},"Util_0":{"id":843,"name":"Kenneth Faried","isHealthy":false,"positions":["PF","F","Util_0","Util_1","Util_2"],"hasGame":true},"Util_1":{"id":426,"name":"Joakim Noah","isHealthy":true,"positions":["C","Util_0","Util_1","Util_2"],"hasGame":true},"Util_2":null,"Benches":[{"id":265,"name":"Andre Iguodala","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":false},{"id":963,"name":"Harrison Barnes","isHealthy":true,"positions":["SF","F","Util_0","Util_1","Util_2"],"hasGame":false},{"id":317,"name":"David Lee","isHealthy":true,"positions":["PF","C","F","Util_0","Util_1","Util_2"],"hasGame":false},{"id":622,"name":"Stephen Curry","isHealthy":true,"positions":["PG","SG","G","Util_0","Util_1","Util_2"],"hasGame":false}]});
        });

        it("will prefer highest pr players for densely packed rosters", function() {
            // All slots active, all slots have 0 PR
            var initRoster = {"PG":{"id":991,"name":"Damian Lillard","isHealthy":true,"positions":["PG","G","Util_0","Util_1","Util_2"],"hasGame":true,"PR":0},"SG":{"id":310,"name":"Danny Granger","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":true,"PR":0},"SF":{"id":963,"name":"Harrison Barnes","isHealthy":true,"positions":["SF","F","Util_0","Util_1","Util_2"],"hasGame":true,"PR":0},"PF":{"id":629,"name":"Taj Gibson","isHealthy":true,"positions":["PF","F","Util_0","Util_1","Util_2"],"hasGame":true,"PR":0},"C":{"id":317,"name":"David Lee","isHealthy":true,"positions":["PF","C","F","Util_0","Util_1","Util_2"],"hasGame":true,"PR":0},"G":{"id":622,"name":"Stephen Curry","isHealthy":true,"positions":["PG","SG","G","Util_0","Util_1","Util_2"],"hasGame":true,"PR":0},"F":{"id":265,"name":"Andre Iguodala","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":true,"PR":0},"Util_0":{"id":634,"name":"Gerald Henderson","isHealthy":true,"positions":["SG","G","Util_0","Util_1","Util_2"],"hasGame":true,"PR":0},"Util_1":{"id":426,"name":"Joakim Noah","isHealthy":true,"positions":["C","Util_0","Util_1","Util_2"],"hasGame":true,"PR":0},"Util_2":{"id":722,"name":"Avery Bradley","isHealthy":true,"positions":["PG","SG","G","Util_0","Util_1","Util_2"],"hasGame":true,"PR":0},"Benches":[{"id":512,"name":"Nikola Pekovic","isHealthy":true,"positions":["C","Util_0","Util_1","Util_2"],"hasGame":false,"PR":0},{"id":627,"name":"Tyreke Evans","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":false,"PR":0},{"id":843,"name":"Kenneth Faried","isHealthy":true,"positions":["PF","F","Util_0","Util_1","Util_2"],"hasGame":false,"PR":0}]};
            var rs = new EspnRosterSetter(initRoster, true);

            var pekovic = rs.roster.Benches[0]
            pekovic.PR = 1000;
            pekovic.hasGame = true
            expect(rs.generateRosterMoves()).toEqual([["Nikola Pekovic",512,"Benches","C"],["David Lee",317,"C","Benches"]]);

            expect(rs.roster).toEqual({"PG":{"id":991,"name":"Damian Lillard","isHealthy":true,"positions":["PG","G","Util_0","Util_1","Util_2"],"hasGame":true,"PR":0},"SG":{"id":310,"name":"Danny Granger","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":true,"PR":0},"SF":{"id":963,"name":"Harrison Barnes","isHealthy":true,"positions":["SF","F","Util_0","Util_1","Util_2"],"hasGame":true,"PR":0},"PF":{"id":629,"name":"Taj Gibson","isHealthy":true,"positions":["PF","F","Util_0","Util_1","Util_2"],"hasGame":true,"PR":0},"C":{"id":512,"name":"Nikola Pekovic","isHealthy":true,"positions":["C","Util_0","Util_1","Util_2"],"hasGame":true,"PR":1000},"G":{"id":622,"name":"Stephen Curry","isHealthy":true,"positions":["PG","SG","G","Util_0","Util_1","Util_2"],"hasGame":true,"PR":0},"F":{"id":265,"name":"Andre Iguodala","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":true,"PR":0},"Util_0":{"id":634,"name":"Gerald Henderson","isHealthy":true,"positions":["SG","G","Util_0","Util_1","Util_2"],"hasGame":true,"PR":0},"Util_1":{"id":426,"name":"Joakim Noah","isHealthy":true,"positions":["C","Util_0","Util_1","Util_2"],"hasGame":true,"PR":0},"Util_2":{"id":722,"name":"Avery Bradley","isHealthy":true,"positions":["PG","SG","G","Util_0","Util_1","Util_2"],"hasGame":true,"PR":0},"Benches":[{"id":627,"name":"Tyreke Evans","isHealthy":true,"positions":["SG","SF","F","G","Util_0","Util_1","Util_2"],"hasGame":false,"PR":0},{"id":843,"name":"Kenneth Faried","isHealthy":true,"positions":["PF","F","Util_0","Util_1","Util_2"],"hasGame":false,"PR":0},{"id":317,"name":"David Lee","isHealthy":true,"positions":["PF","C","F","Util_0","Util_1","Util_2"],"hasGame":true,"PR":0}]});
        })
    });
});