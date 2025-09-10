import { Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Panel, PanelHeader, PanelFooter } from '../../components/panel/panel';

function DashboardV2() {
	
	return (
		<>
			<ol className="breadcrumb float-xl-end">
				<li className="breadcrumb-item"><Link to="/dashboard/v2">Home</Link></li>
				<li className="breadcrumb-item"><Link to="/dashboard/v2">Dashboard</Link></li>
				<li className="breadcrumb-item active">Dashboard v2</li>
			</ol>
			<h1 className="page-header">Dashboard v2 <small>header small text goes here...</small></h1>
			<div className="row">
				<div className="col-xl-3 col-md-6">
					<div className="widget widget-stats bg-teal">
						<div className="stats-icon stats-icon-lg"><i className="fa fa-globe fa-fw"></i></div>
						<div className="stats-content">
							<div className="stats-title">TODAY'S VISITS</div>
							<div className="stats-number">7,842,900</div>
							<div className="stats-progress progress">
								<div className="progress-bar" style={{width: '70.1%'}}></div>
							</div>
							<div className="stats-desc">Better than last week (70.1%)</div>
						</div>
					</div>
				</div>
				<div className="col-xl-3 col-md-6">
					<div className="widget widget-stats bg-blue">
						<div className="stats-icon stats-icon-lg"><i className="fa fa-dollar-sign fa-fw"></i></div>
						<div className="stats-content">
							<div className="stats-title">TODAY'S PROFIT</div>
							<div className="stats-number">180,200</div>
							<div className="stats-progress progress">
								<div className="progress-bar" style={{width: '40.5%'}}></div>
							</div>
							<div className="stats-desc">Better than last week (40.5%)</div>
						</div>
					</div>
				</div>
				<div className="col-xl-3 col-md-6">
					<div className="widget widget-stats bg-indigo">
						<div className="stats-icon stats-icon-lg"><i className="fa fa-archive fa-fw"></i></div>
						<div className="stats-content">
							<div className="stats-title">NEW ORDERS</div>
							<div className="stats-number">38,900</div>
							<div className="stats-progress progress">
								<div className="progress-bar" style={{width: '76.3%'}}></div>
							</div>
							<div className="stats-desc">Better than last week (76.3%)</div>
						</div>
					</div>
				</div>
				<div className="col-xl-3 col-md-6">
					<div className="widget widget-stats bg-dark">
						<div className="stats-icon stats-icon-lg"><i className="fa fa-comment-alt fa-fw"></i></div>
						<div className="stats-content">
							<div className="stats-title">NEW COMMENTS</div>
							<div className="stats-number">3,988</div>
							<div className="stats-progress progress">
								<div className="progress-bar" style={{width: '54.9%'}}></div>
							</div>
							<div className="stats-desc">Better than last week (54.9%)</div>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-xl-8">
					<div className="widget-chart with-sidebar inverse-mode">
						<div className="widget-chart-content bg-gray-800">
							<h4 className="chart-title">
								Visitors Analytics
								<small>Where do our visitors come from</small>
							</h4>
							<div className="widget-chart-full-width dark-mode overflow-hidden pe-3 mb-n3 pt-3">
							</div>
						</div>
						<div className="widget-chart-sidebar bg-gray-900">
							<div className="chart-number">
								1,225,729
								<small>Total visitors</small>
							</div>
							<div className="flex-grow-1 d-flex align-items-center dark-mode">
							</div>
							<ul className="chart-legend fs-11px">
								<li><i className="fa fa-circle fa-fw text-blue fs-9px me-5px t-minus-1"></i> 34.0% <span>New Visitors</span></li>
								<li><i className="fa fa-circle fa-fw text-teal fs-9px me-5px t-minus-1"></i> 56.0% <span>Return Visitors</span></li>
							</ul>
						</div>
					</div>
				</div>
				<div className="col-xl-4">
					<Panel>
						<PanelHeader noButton={true}>
							Visitors Origin
						</PanelHeader>
						<div style={{height: '170px'}}>
							<div id="jvectorMap" style={{height: '170px'}}></div>
						</div>
						<div className="list-group" data-bs-theme="dark">
							<div className="list-group list-group-flush "  data-bs-theme="dark">
								<a href="#/" className="list-group-item list-group-item-action d-flex">
									<span className="flex-1">1. United State</span>
									<span className="badge bg-teal fs-10px">20.95%</span>
								</a>
								<a href="#/" className="list-group-item list-group-item-action d-flex">
									<span className="flex-1">2. India</span>
									<span className="badge bg-blue fs-10px">16.12%</span>
								</a>
								<a href="#/" className="list-group-item list-group-item-action d-flex rounded-bottom">
									<span className="flex-1">3. Mongolia</span>
									<span className="badge bg-gray-600 fs-10px">14.99%</span>
								</a>
							</div>
						</div>
					</Panel>
				</div>
			</div>
			<div className="row">
				<div className="col-xl-4 col-lg-6">
					<Panel className="bg-light">
						<PanelHeader noButton={true}>
							<div className="d-flex">
								Chat History <span className="badge bg-teal ms-auto">4 message</span>
							</div>
						</PanelHeader>
						<PerfectScrollbar className="chats" style={{height: '260px'}} options={{suppressScrollX: true}}>
							<div className="chats-item start">
								<span className="date-time">yesterday 11:23pm</span>
								<Link to="/dashboard/v2" className="name">Sowse Bawdy</Link>
								<Link to="/dashboard/v2" className="image">
								{/* <img alt="" src="/assets/img/user/user-12.jpg" /> */}
								</Link>
								<div className="message">
									Lorem ipsum dolor sit amet, consectetuer adipiscing elit volutpat. Praesent mattis interdum arcu eu feugiat.
								</div>
							</div>
							<div className="chats-item end">
								<span className="date-time">08:12am</span>
								<Link to="/dashboard/v2" className="name"><span className="badge bg-blue">ADMIN</span> Me</Link>
								<Link to="/dashboard/v2" className="image">
								{/* <img alt="" src="/assets/img/user/user-13.jpg" /> */}
								</Link>
								<div className="message">
									Nullam posuere, nisl a varius rhoncus, risus tellus hendrerit neque.
								</div>
							</div>
							<div className="chats-item start">
								<span className="date-time">09:20am</span>
								<Link to="/dashboard/v2" className="name">Neck Jolly</Link>
								<Link to="/dashboard/v2" className="image">
								{/* <img alt="" src="/assets/img/user/user-10.jpg" /> */}
								</Link>
								<div className="message">
									Euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
								</div>
							</div>
							<div className="chats-item start">
								<span className="date-time">11:15am</span>
								<Link to="/dashboard/v2" className="name">Shag Strap</Link>
								<Link to="/dashboard/v2" className="image">
								{/* <img alt="" src="/assets/img/user/user-14.jpg" /> */}
								</Link>
								<div className="message">
									Nullam iaculis pharetra pharetra. Proin sodales tristique sapien mattis placerat.
								</div>
							</div>
						</PerfectScrollbar>
						<PanelFooter>
							<form name="send_message_form" data-id="message-form">
								<div className="input-group">
									<input type="text" className="form-control" name="message" placeholder="Enter your message here." />
									<button className="btn btn-primary" type="button"><i className="fa fa-camera"></i></button>
									<button className="btn btn-primary" type="button"><i className="fa fa-link"></i></button>
								</div>
							</form>
						</PanelFooter>
					</Panel>
				</div>
				<div className="col-xl-4 col-lg-6">
					<Panel>
						<PanelHeader noButton={true}>
							Today's Schedule
						</PanelHeader>
						<div>
						</div>
						<hr className="m-0 bg-gray-500" />
						<div className="list-group list-group-flush">
							<Link to="/dashboard/v2" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center text-ellipsis">
								Sales Reporting
								<span className="badge bg-teal fs-10px">9:00 am</span>
							</Link> 
							<Link to="/dashboard/v2" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center text-ellipsis rounded-bottom">
								Have a meeting with sales team
								<span className="badge bg-blue fs-10px">2:45 pm</span>
							</Link>
						</div>
					</Panel>
				</div>
				<div className="col-xl-4 col-lg-6">
					<Panel>
						<PanelHeader noButton={true}>
							<div className="d-flex">
								New Registered Users 
								<span className="badge bg-teal ms-auto">24 new users</span>
							</div>
						</PanelHeader>
						<ul className="registered-users-list clearfix">
							<li>
								<Link to="/dashboard/v2">
								{/* <img src="/assets/img/user/user-5.jpg" alt="" /> */}
								</Link>
								<h4 className="username text-ellipsis">
									Savory Posh
									<small>Algerian</small>
								</h4>
							</li>
							<li>
								<Link to="/dashboard/v2">
								{/* <img src="/assets/img/user/user-3.jpg" alt="" /> */}
								</Link>
								<h4 className="username text-ellipsis">
									Ancient Caviar
									<small>Korean</small>
								</h4>
							</li>
							<li>
								<Link to="/dashboard/v2">
								{/* <img src="/assets/img/user/user-1.jpg" alt="" /> */}
								</Link>
								<h4 className="username text-ellipsis">
									Marble Lungs
									<small>Indian</small>
								</h4>
							</li>
							<li>
								<Link to="/dashboard/v2">
								{/* <img src="/assets/img/user/user-8.jpg" alt="" /> */}
								</Link>
								<h4 className="username text-ellipsis">
									Blank Bloke
									<small>Japanese</small>
								</h4>
							</li>
							<li>
								<Link to="/dashboard/v2">
								{/* <img src="/assets/img/user/user-2.jpg" alt="" /> */}
								</Link>
								<h4 className="username text-ellipsis">
									Hip Sculling
									<small>Cuban</small>
								</h4>
							</li>
							<li>
								<Link to="/dashboard/v2">
								{/* <img src="/assets/img/user/user-6.jpg" alt="" /> */}
								</Link>
								<h4 className="username text-ellipsis">
									Flat Moon
									<small>Nepalese</small>
								</h4>
							</li>
							<li>
								<Link to="/dashboard/v2">
								{/* <img src="/assets/img/user/user-4.jpg" alt="" /> */}
								</Link>
								<h4 className="username text-ellipsis">
									Packed Puffs
									<small>Malaysian</small>
								</h4>
							</li>
							<li>
								<Link to="/dashboard/v2">
								{/* <img src="/assets/img/user/user-9.jpg" alt="" /> */}
								</Link>
								<h4 className="username text-ellipsis">
									Clay Hike
									<small>Swedish</small>
								</h4>
							</li>
						</ul>
						<PanelFooter className="text-center">
							<Link to="/dashboard/v2" className="text-decoration-none text-body">View All</Link>
						</PanelFooter>
					</Panel>
				</div>
			</div>
		</>
	)
};

export default DashboardV2;