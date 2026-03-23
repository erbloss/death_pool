import { useState, useEffect, React } from "react";
import { supabase } from "../lib/supabaseClient";
import { Link } from "react-router-dom";
import ActiveBetsTable from "./ActiveBetsTable";
import RealTimeClock from "./RealTimeClock";
import "./HomePage.css";

export default function HomePage() {

    const [activeBets, setActiveBets] = useState([])
    const [totalPot, setTotalPot] = useState("0.00")
    var numBets = 0;

    // Local table for previous winners
    const previousWinners = [
        { Name: "Francisco C.", Entry: "Ayatollah Khomeini", RIP: "06/03/2026", Payout: "$420" }
    ];

    useEffect(() => {
        getActiveBets();
    }, []);

    // function to retrieve data for active bets table
    // pulls name, entry, and admin confirmation
    async function getActiveBets() {
        const confirmedBets = [];
        const { data } = await supabase.from("bets").select('name, Entry:celeb_guess, confirmed_by_admin');

        // only bets confirmed by admin are displayed in table
        for (const d of data) {
            if (d.confirmed_by_admin) {
                confirmedBets.push({ name: d.name, Entry: d.Entry });
            };
        };

        // only confirmed bets counted toward pot
        numBets = confirmedBets.length;
        const formattedPot = ((numBets * 20) + ".00")
        setTotalPot(formattedPot);
        setActiveBets(confirmedBets);
    }

    // ------------  frontend ------------------------------
    return (
        <div className="homepage">
            <h1>xX 💀 DEATH POOL 💀 Xx</h1>
            <br />

            <h2 style={{ color: "DarkKhaki", fontSize: "300%" }}>CURRENT PAYOUT : ${totalPot}</h2>


            <h4>&gt;&gt;&gt;&gt;&gt; Want to jump in the pool? Place your bet <Link to="/bet">HERE</Link> &lt;&lt;&lt;&lt;&lt;</h4>
            <br />

            <h2>CURRENT BETS</h2>
            <div className="tableContainer">
                <ActiveBetsTable data={activeBets} />
            </div>
            <p style={{ fontSize: "10px" }}>*NOTE: Your entry will only appear here after admin verification.</p>
            <br />
            <br />

            <h2>PREVIOUS WINNERS</h2>
            <div className="tableContainer">
                <ActiveBetsTable data={previousWinners} />
            </div>

            <br />
            <br />
            <br />
            <p style={{ fontSize: "10px" }}>*DISCLAIMER: Death Pool is strictly for dark whimsy and bragging rights. While names have been entered, no curses have been cast, and no ill will is intended toward any person mentioned.</p>
            <RealTimeClock />
        </div>
    );
}