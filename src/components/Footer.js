import React from 'react'
import { Link } from 'gatsby'

const Footer = () => (
    <div className="footer">
        <div className="flex vertical-center between">
            <div>
                <span>&copy; 2018 Jack Doyle</span>
            </div>
            <div>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        Work
                    </li>
                    <li>
                        Contact
                    </li>
                </ul>
            </div>
        </div>
    </div>
)

export default Footer
