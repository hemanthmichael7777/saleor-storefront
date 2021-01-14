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

                    {/* <div className="fitting-guide__size-chart" style={{paddingTop: 30}}>
                        <h1>
                            Fill chart
                        </h1>
                    </div> */}
                </div>

                <div className="fitting-guide__body__infocontainer">
                    <div className="fitting-guide__body__flexcontainer">
                        <div className="fitting-guide__body__infotitle">
                            <h1>
                                3. Tips for Best Results
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
        </div>
    </div>
);
export default FittingPage;
