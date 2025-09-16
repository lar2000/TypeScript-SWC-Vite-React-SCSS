
import { Link } from 'react-router-dom';

function Widgets() {
		
	return (
		<>
			<ol className="breadcrumb float-xl-end">
				<li className="breadcrumb-item"><Link to="/widget">Home</Link></li>
				<li className="breadcrumb-item active">Widgets</li>
			</ol>
			<h1 className="page-header">
				Widgets <small>header small text goes here...</small>
			</h1>
			<p className="mb-20px">
				All the widgets is reusable and responsive. You may use the predefined css to configure the padding, margin or background. Besides that, all the widgets have light and dark version. 
				Kindly add the <code>.dark-mode</code> to the widget will change it to the dark version.
			</p>
		</>
	)
}

export default Widgets;