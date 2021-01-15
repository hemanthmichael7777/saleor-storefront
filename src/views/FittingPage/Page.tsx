import * as React from "react";

import { headerImg } from "./config"

interface PageProps {


}
export const FittingPage: React.FC<PageProps> = ({

}) => (
    <div className="fitting-guide">
        <div className="fitting-guide__header" style={{ backgroundImage: headerImg }}>
            <div className="fitting-guide__header-tag-container">
                <h1>
                    Fitting Guide
                </h1>
            </div>
        </div>

        <div className="fitting-guide__body">
            <div className="fitting-guide__body__container">
                <div className="fitting-guide__body__title">
                    <h1>
                        Longline Bras
                    </h1>
                </div>

                <div className="fitting-guide__body__infocontainer">
                    <div className="fitting-guide__body__flexcontainer">
                        <div className="fitting-guide__body__infotitle">
                            <h1>
                                1. Measure Your Band Size
                        </h1>
                        </div>
                        <div className="fitting-guide__body__info">
                            <ol>
                                <li>
                                    <span>&#8226;</span>
                                    <h2>
                                        Using a soft tape measure, measure around your bra directly under
                                        your bust. Look in a mirror to assure the tape is snug, smooth across
                                        the back, and parallel to the floor. The tape should rest on the lower
                                        band of your bra.
                                </h2>
                                </li>
                                <li>
                                    <span>&#8226;</span>
                                    <h2>
                                        With this measurement, round to the closest whole inch
                                        up or down. For example, if your measurement is 29 3/8”, round down
                                        to 29”. If your measurement is 29 1/2” or more, round up to 30”.
                                </h2>
                                </li>
                                <li>
                                    <span>&#8226;</span>
                                    <h2>
                                        <b>Add 5</b> to this measurement to obtain your band size.
                                    For example, if your ribcage measurement is 29” - add 5
                                    (29+5=34). Your band size is 34”.
                                    If the resulting band size is an odd number like 33”, you can usually go
                                    to the next band size (34”), but you should
                                    also try the next lower band size (32”).
                                </h2>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>

                <div className="fitting-guide__body__infocontainer">
                    <div className="fitting-guide__body__flexcontainer">
                        <div className="fitting-guide__body__infotitle">
                            <h1>
                                2. Measure Your Cup Size
                            </h1>
                        </div>
                        <div className="fitting-guide__body__info">
                            <ol>
                                <li>
                                    <span>&#8226;</span>
                                    <h2>
                                        With the same soft tape measure, measure around the bust at the
                                        fullest point. Hold the tape measure straight but not tight.
                                </h2>
                                </li>
                                <li>
                                    <span>&#8226;</span>
                                    <h2>
                                        The difference between this measurement and your BAND size is your
                                        cup size. Each inch of difference is equal to one cup size. For example,
                                        if your band size is 34” and your bust measurement is 35“, you wear an
                                        “A” cup. Use the chart to calculate cup size.
                                </h2>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>

                <table className="tg">
                    <thead>
                        <tr>
                            <th className="tg-0lax">Difference (inches)</th>
                            <th className="tg-0lax">1"</th>
                            <th className="tg-0lax">2"</th>
                            <th className="tg-0lax">3"</th>
                            <th className="tg-0lax">4"</th>
                            <th className="tg-0lax">5"</th>
                            <th className="tg-0lax">6"</th>
                            <th className="tg-0lax">7"</th>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <th className="tg-0lax">Cup Size</th>
                            <th className="tg-0lax">A</th>
                            <th className="tg-0lax">B</th>
                            <th className="tg-0lax">C</th>
                            <th className="tg-0lax">D</th>
                            <th className="tg-0lax">DD</th>
                            <th className="tg-0lax">F</th>
                            <th className="tg-0lax">G</th>
                        </tr>
                    </thead>
                </table>

                <div className="fitting-guide__body__infocontainer">
                    <div className="fitting-guide__body__flexcontainer">
                        <div className="fitting-guide__body__infotitle">
                            <h1>
                                Tips for Best Results
                            </h1>
                        </div>
                        <div className="fitting-guide__body__info">
                            <ol>
                                <li>
                                    <span>&#8226;</span>
                                    <h2>
                                        Always measure wearing an unlined or lightly lined bra. Avoid minimizers and padded bras.
                                    </h2>
                                </li>
                                <li>
                                    <span>&#8226;</span>
                                    <h2>
                                        If possible, enlist the help of a friend to take your measurements. Otherwise, stand in front of a mirror.
                                    </h2>
                                </li>
                                <li>
                                    <span>&#8226;</span>
                                    <h2>
                                        Take care to keep the measuring tape parallel to the floor. Hold the tape measure straight but not tight.
                                        Be patient! Take your time. It may take you a few attempts to get accurate measurements.
                                    </h2>
                                </li>
                                <li>
                                    <span>&#8226;</span>
                                    <h2>
                                        Keep in mind that longline fitting is as much an art as a science. No fit guide can take the place of a
                                        highly experienced, professional fitter. No two women have the exact same body shape or size.
                                    </h2>
                                </li>
                                <li>
                                    <span>&#8226;</span>
                                    <h2>
                                        Dominique cups tend to run a bit fuller than most. Keep this in mind when calculating size.
                                    </h2>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>

            </div>

            <div className="fitting-guide__body__container">
                <div className="fitting-guide__body__title">
                    <h1>
                        Bottoms
                    </h1>
                </div>

                <div className="fitting-guide__body__infocontainer">
                    <div className="fitting-guide__body__flexcontainer">
                        <div className="fitting-guide__body__infotitle">
                            <h1>
                                1. Waist Measurement
                            </h1>
                        </div>
                        <div className="fitting-guide__body__info">
                            <ol>
                                <li>
                                    <span>&#8226;</span>
                                    <h2>
                                        Using a soft tape measure, measure around
                                        your waist at the narrowest part. Be sure to
                                        keep the tape measure horizontal.
                                    </h2>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
                <div className="fitting-guide__body__infocontainer">
                    <div className="fitting-guide__body__flexcontainer">
                        <div className="fitting-guide__body__infotitle">
                            <h1>
                                2. Hip Measurement
                            </h1>
                        </div>
                        <div className="fitting-guide__body__info">
                            <ol>
                                <li>
                                    <span>&#8226;</span>
                                    <h2>
                                        Using the same soft tape measure, measure
                                        your hips at the widest point. Be sure to keep
                                        the tape measure horizontal.
                                    </h2>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
                <div className="fitting-guide__body__infocontainer">
                    <div className="fitting-guide__body__flexcontainer">
                        <div className="fitting-guide__body__infotitle">
                            <h1>
                                3. Calculate Your Size
                            </h1>
                        </div>
                        <div className="fitting-guide__body__info">
                            <ol>
                                <li>
                                    <span>&#8226;</span>
                                    <h2>
                                        Body measurements are provided in
                                        inches. Consult the chart using waist and hip measurement
                                    </h2>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
                <div>
                    <table className="tgcompact">
                        <thead>
                            <tr>
                                <th className="tg-1lax">Size</th>
                                <th className="tg-1lax">S</th>
                                <th className="tg-1lax">M</th>
                                <th className="tg-1lax">L</th>
                                <th className="tg-1lax">XL</th>
                                <th className="tg-1lax">2XL</th>
                                <th className="tg-1lax">3XL</th>
                                <th className="tg-1lax">4XL</th>
                                <th className="tg-1lax">5XL</th>
                            </tr>

                        </thead>


                        <thead>
                            <tr>
                                <th className="tg-1lax">Waist</th>
                                <th className="tg-1lax">26” - 29”</th>
                                <th className="tg-1lax">29” - 31 1/2 ”</th>
                                <th className="tg-1lax">31 1/2 ” - 34 1/2”</th>
                                <th className="tg-1lax">34 1/2 ” - 38 1/2”</th>
                                <th className="tg-1lax">38 1/2” - 42 1/2”</th>
                                <th className="tg-1lax">42 1/2” - 46 1/2”</th>
                                <th className="tg-1lax">46 1/2” - 50 1/2”</th>
                                <th className="tg-1lax">50 1/2” - 54 1/2”</th>
                            </tr>
                            <tr>
                                <th className="tg-1lax">Hips</th>
                                <th className="tg-1lax">35” - 38 1/2”</th>
                                <th className="tg-1lax">38 1/2“ - 41”</th>
                                <th className="tg-1lax">41“ - 44”</th>
                                <th className="tg-1lax">44“ - 47”</th>
                                <th className="tg-1lax">47“ - 50”</th>
                                <th className="tg-1lax">50“ - 53”</th>
                                <th className="tg-1lax">53“ - 56”</th>
                                <th className="tg-1lax">56“ - 59”</th>
                            </tr>
                        </thead>
                    </table>
                </div>

                <div className="fitting-guide__body__infocontainer">
                    <div className="fitting-guide__body__flexcontainer">
                        <div className="fitting-guide__body__infotitle">
                            <h1>
                                Tips For Best Results
                            </h1>
                        </div>
                        <div className="fitting-guide__body__info">
                            <ol>
                                <li>
                                    <span>&#8226;</span>
                                    <h2>
                                        If your body measurement is on the borderline between two sizes, order the smaller size for a tighter fit or the
                                        larger size for a looser fit.
                                    </h2>
                                </li>
                                <li>
                                    <span>&#8226;</span>
                                    <h2>
                                        If your body measurements for hips and waist result in two different suggested sizes, order the size from your
                                        hip measurement.
                                    </h2>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
export default FittingPage;
