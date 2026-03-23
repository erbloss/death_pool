import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import "./BetForm.css";
import RealTimeClock from "./RealTimeClock";

export default function BetForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone_number, setPhone] = useState("");
    const [guess, setGuess] = useState("");
    const [venmo, setVenmo] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    // ensure that phone number is valid format
    const validatePhone = () => {
        const phoneRegex = /^\+?(\d{1,3})?[-.\s]?(\d{3})[-.\s]?(\d{4})$/;
        return phoneRegex.test(phone_number);
    };

    // handle the submit button being clicked.  
    const handleSubmit = async (e) => {
        e.preventDefault();

        // display error if phone number validation returns false
        if (!validatePhone()) {
            console.log("phone validity: ", validatePhone())
            setMessage("** INVALID PHONE NUMBER **")
            return;
        }


        // insert bet into database
        const { error } = await supabase.from("bets").insert([
            {
                name: name,
                email: email,
                phone_number: phone_number,
                celeb_guess: guess,
                venmo_username: venmo
            }
        ]);

        if (error) {
            // display error if entry is not a unique celebrity
            if (error.code === "23505") {
                setMessage("** CELEBRITY ALREADY EXISTS IN POOL! **\n** Please choose another entry. **");
            } else {
                setMessage("** OOPS! TRY AGAIN **");
                console.log("Error adding bet: ", error);
            }
            return;

        } else {
            setMessage("CONGRATULATIONS!!! Bet officially submitted. You will be redirected for payment in 10 seconds...");

            // redirect user to venmo for bet payment
            const delay = 10000;
            setTimeout(function () {
                window.location.href = "https://venmo.com/ERyan-Bloss";
            }, delay);

            // clear submission form
            setName("");
            setEmail("");
            setPhone("");
            setGuess("");
            setVenmo("");
        }
    };

    return (
        <div>
            <h1>💀 xX   DEATH POOL   Xx 💀</h1>
            <br />
            <h2>Which celebrity do you wager will go next ?!?</h2>
            <br />

            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <label>Entry : </label>
                    <input
                        type="text"
                        placeholder="Celebrity Name"
                        value={guess}
                        onChange={(e) => setGuess(e.target.value)}
                        required
                    />
                </div><br />

                <div className="form-row">
                    <label>Name : </label>
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div><br />

                <div className="form-row">
                    <label>Email : </label>
                    <input
                        type="email"
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div><br />

                <div className="form-row">
                    <label>Phone : </label>
                    <input
                        type="text"
                        placeholder="123-456-7890"
                        value={phone_number}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div><br />

                <div className="form-row">
                    <label>Venmo : </label>
                    <input
                        type="text"
                        placeholder="Your Username"
                        value={venmo}
                        onChange={(e) => setVenmo(e.target.value)}
                        required
                    />
                </div><br />

                <p style={{ fontSize: "10px" }}>*NOTE: You will be redirected to Venmo for payment after submitting your entry.</p>

                <button type="SUBMIT">Submit Bet</button>

                <p style={{ color: "DarkKhaki" }}>{message}</p>

                <button onClick={() => navigate("/")}>Back to Dashboard</button>
            </form >


            {/* Rules Section */}
            <br />
            <br />
            <div className="ruleSection">
                <h1>Official Rules</h1>

                <h5> RULE 1: Each entry is a $20 buy-in via Venmo.  You may place multiple entries if you'd like to increase your odds of winning. </h5>

                <h5> RULE 2: Entries must be A/B list celebrities.  Politicians are acceptable, but must be serving/have served their term in the United States.  Validity of your entry is subject to the discretion of admin and your entry may become void. </h5>

                <h5> RULE 3: There may be no duplicate entries.  Attempting to copy another player's bet will result in an error and we will boo you for being unoriginal.</h5>

                <h5> RULE 4: The person who's celebrity kicks the bucket first will take the entire pot.  All bets become null at that point and a subsequent round of Death Pool will begin with new entries on a first come, first serve basis. </h5>

                <br />
                <br />
            </div>
            <RealTimeClock />
            <br />
        </div >
    );
}