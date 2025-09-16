// src/pages/email/EmailInbox.tsx
import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { AppSettings } from '../../config/app-settings';

function EmailInbox(): React.ReactElement {
  const context = useContext(AppSettings);
  const [isMobileEmailNavOn, setIsMobileEmailNavOn] = useState<boolean>(false);

  useEffect(() => {
    context?.handleSetAppContentFullHeight(true);
    context?.handleSetAppContentClass('p-0');

    return () => {
      context?.handleSetAppContentFullHeight(false);
      context?.handleSetAppContentClass('');
    };
  }, [context]);

  function toggleMobileEmailNav(): void {
    setIsMobileEmailNavOn(!isMobileEmailNavOn);
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>): void {
    // TODO: handle checkbox logic (select all, etc.)
    console.log(`${e.target.id} checked: ${e.target.checked}`);
  }

  return (
    <div className="mailbox">
      {/* Sidebar */}
      <div className="mailbox-sidebar">
        <div className="mailbox-sidebar-header d-flex justify-content-center">
          <button
            onClick={toggleMobileEmailNav}
            className="btn btn-dark btn-sm me-auto d-block d-lg-none"
          >
            <i className="fa fa-cog"></i>
          </button>
          <Link to="/email/compose" className="btn btn-dark ps-40px pe-40px btn-sm">
            Compose
          </Link>
        </div>
        <div
          className={
            'mailbox-sidebar-content collapse d-lg-block ' +
            (isMobileEmailNavOn ? 'show' : '')
          }
        >
          <PerfectScrollbar className="h-100" options={{ suppressScrollX: true }}>
            <div className="nav-title">
              <b>FOLDERS</b>
            </div>
            <ul className="nav nav-inbox">
              <li className="active">
                <Link to="/email/inbox">
                  <i className="fa fa-hdd fa-lg fa-fw me-2"></i> Inbox{' '}
                  <span className="badge bg-gray-600 fs-10px rounded-pill ms-auto fw-bolder pt-4px pb-5px px-8px">
                    52
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/email/inbox">
                  <i className="fa fa-flag fa-lg fa-fw me-2"></i> Important
                </Link>
              </li>
              <li>
                <Link to="/email/inbox">
                  <i className="fa fa-envelope fa-lg fa-fw me-2"></i> Sent
                </Link>
              </li>
              <li>
                <Link to="/email/inbox">
                  <i className="fa fa-save fa-lg fa-fw me-2"></i> Drafts
                </Link>
              </li>
              <li>
                <Link to="/email/inbox">
                  <i className="fa fa-trash-alt fa-lg fa-fw me-2"></i> Trash
                </Link>
              </li>
            </ul>
            <div className="nav-title">
              <b>LABEL</b>
            </div>
            <ul className="nav nav-inbox">
              <li>
                <Link to="/email/inbox">
                  <i className="fa fa-fw fa-lg fs-12px me-2 fa-circle text-dark"></i> Admin
                </Link>
              </li>
              <li>
                <Link to="/email/inbox">
                  <i className="fa fa-fw fa-lg fs-12px me-2 fa-circle text-blue"></i> Designer &
                  Employer
                </Link>
              </li>
              <li>
                <Link to="/email/inbox">
                  <i className="fa fa-fw fa-lg fs-12px me-2 fa-circle text-success"></i> Staff
                </Link>
              </li>
              <li>
                <Link to="/email/inbox">
                  <i className="fa fa-fw fa-lg fs-12px me-2 fa-circle text-warning"></i> Sponsorer
                </Link>
              </li>
              <li>
                <Link to="/email/inbox">
                  <i className="fa fa-fw fa-lg fs-12px me-2 fa-circle text-danger"></i> Client
                </Link>
              </li>
            </ul>
          </PerfectScrollbar>
        </div>
      </div>

      {/* Content */}
      <div className="mailbox-content">
        <div className="mailbox-content-header">
          <div className="btn-toolbar align-items-center">
            <div className="form-check me-2">
              <input
                onChange={handleOnChange}
                type="checkbox"
                className="form-check-input"
                id="emailSelectAll"
              />
              <label className="form-check-label" htmlFor="emailSelectAll"></label>
            </div>
            {/* ... rest of toolbar ... */}
          </div>
        </div>

        <div className="mailbox-content-body">
          <PerfectScrollbar className="h-100" options={{ suppressScrollX: true }}>
            <ul className="list-group list-group-lg no-radius list-email">
              {/* ... email list items ... */}
            </ul>
          </PerfectScrollbar>
        </div>

        <div className="mailbox-content-footer d-flex align-items-center">
          <div className="text-dark fw-bold">1,232 messages</div>
          <div className="btn-group ms-auto">
            <button className="btn btn-white btn-sm">
              <i className="fa fa-fw fa-chevron-left"></i>
            </button>
            <button className="btn btn-white btn-sm">
              <i className="fa fa-fw fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailInbox;