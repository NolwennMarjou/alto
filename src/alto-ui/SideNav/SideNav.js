import React from 'react';
import PropTypes from 'prop-types';

import Overlay from '../Overlay';
import CollapseIcon from '../Icons/Collapse';
import ExpandIcon from '../Icons/Expand';
import ChevronDownIcon from '../Icons/ChevronDown';
import VisuallyHidden from '../VisuallyHidden';
import Button from '../Button';
import Link from '../Link';
import { bemClass } from '../helpers/bem';

import './SideNav.scss';

class SideNav extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
      open: false,
      sectionOpen: null,
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleToggleOpen = this.handleToggleOpen.bind(this);
    this.handleClickLink = this.handleClickLink.bind(this);
  }

  handleToggle() {
    this.setState(({ collapsed }) => ({ collapsed: !collapsed }));
  }

  handleToggleSection(title) {
    this.setState(({ sectionOpen }) => ({
      sectionOpen: sectionOpen === title ? null : title,
    }));
  }

  handleToggleOpen() {
    this.setState(({ open }) => ({ open: !open }));
  }

  handleClickLink() {
    this.setState(({ collapsed, sectionOpen }) => ({
      open: false,
      sectionOpen: collapsed ? null : sectionOpen,
    }));
  }

  renderNavSubItems(items, open, parentId) {
    // if (this.state.collapsed) return [];

    return items.map(item => (
      <li id={`${this.props.id}__${parentId}__${item.id}`} key={item.title}>
        <Link
          id={`${this.props.id}__${parentId}__${item.id}__link`}
          href={item.url}
          onClick={this.handleClickLink}
          className={bemClass('sidenav__route-link', {
            active: this.props.currentUrl.indexOf(item.url) === 0,
          })}
          tabIndex={open ? 0 : -1}
        >
          {item.title}
        </Link>
      </li>
    ));
  }

  renderNavItems() {
    const { collapsed } = this.state;
    return this.props.items.map(item => {
      const open = this.state.sectionOpen === item.title;
      const active = !!item.items.find(({ url }) => this.props.currentUrl.indexOf(url) === 0);

      const subList = (
        <ul
          className={bemClass('sidenav__sub-list', { collapsed, open })}
          style={{ height: `${open ? item.items.length * 2.5 : 0}rem` }}
          aria-hidden={!open}
        >
          <li className="sidenav__overlay-title">{item.title}</li>
          {this.renderNavSubItems(item.items, open, item.id)}
        </ul>
      );
      return (
        <li
          id={`${this.props.id}__${item.id}`}
          className={bemClass('sidenav__section', { collapsed })}
          key={item.title}
        >
          <button
            className={bemClass('sidenav__section-button', {
              collapsed,
              active,
            })}
            onClick={() => this.handleToggleSection(item.title)}
            id={`${this.props.id}__${item.id}__button`}
          >
            <div className="sidenav__section-item">
              {item.icon && (
                <div className="sidenav__section-item-icon">
                  <item.icon outline />
                </div>
              )}
              <div className="sidenav__section-item-title">{item.title}</div>
              <div
                className={bemClass(
                  'sidenav__icon-container',
                  { reverse: open },
                  'sidenav__section-item-chevron'
                )}
              >
                <ChevronDownIcon />
              </div>
            </div>
          </button>
          {collapsed ? (
            <Overlay
              open={open}
              onClose={() => this.handleToggleSection(item.title)}
              openFocusTargetId={`${this.props.id}__${item.id}__${item.items[0].id}__link`}
              closeFocusTargetId={`${this.props.id}__${item.id}__button`}
            >
              {subList}
            </Overlay>
          ) : (
            subList
          )}
        </li>
      );
    });
  }

  render() {
    const { collapsed, open } = this.state;
    const {
      expandButtonLabel,
      collapseButtonLabel,
      logoUrl,
      logoSmall,
      logo,
      openMenuButtonLabel,
      closeMenuButtonLabel,
      children,
      dark,
      id,
      color,
    } = this.props;
    return (
      <aside id={id} className={bemClass('sidenav', { collapsed, dark, [color]: true })}>
        <header className="sidenav__header">
          <a id={`${id}__logo`} className="sidenav__logo" href={logoUrl}>
            {collapsed ? logoSmall : logo}
          </a>
          <a
            id={`${id}__logo--narrow`}
            className="sidenav__logo sidenav__logo--narrow"
            href={logoUrl}
          >
            {logo}
          </a>
        </header>
        <ul className="sidenav__sections-list">{this.renderNavItems()}</ul>
        <div
          className={bemClass('sidenav__sections-list-narrow-container', {
            open,
          })}
          aria-hidden={!open}
        >
          <ul className={bemClass('sidenav__sections-list-narrow', { open })} aria-hidden={!open}>
            {this.renderNavItems()}
          </ul>
        </div>
        {!!children && (
          <div className="sidenav__content">
            {typeof children === 'function' ? children({ collapsed, open }) : children}
          </div>
        )}
        <Button
          id={`${id}__menu-button`}
          flat
          white={dark}
          onClick={this.handleToggleOpen}
          className="sidenav__menu-button"
        >
          {open ? closeMenuButtonLabel : openMenuButtonLabel}
        </Button>
        <button
          id={`${id}__collapse-button`}
          className={bemClass(
            'sidenav__icon-container',
            { reverse: collapsed },
            'sidenav__toggle-button'
          )}
          onClick={this.handleToggle}
          aria-expanded={collapsed}
        >
          {collapsed ? <ExpandIcon /> : <CollapseIcon />}
          <VisuallyHidden>{collapsed ? expandButtonLabel : collapseButtonLabel}</VisuallyHidden>
        </button>
      </aside>
    );
  }
}

SideNav.displayName = 'SideNav';

SideNav.defaultProps = {
  dark: false,
  id: 'sidenav',
};

SideNav.propTypes = {
  id: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.any]),
  logo: PropTypes.any,
  color: PropTypes.string.isRequired,
  logoSmall: PropTypes.any,
  logoUrl: PropTypes.string,
  currentUrl: PropTypes.string,
  dark: PropTypes.bool,
  expandButtonLabel: PropTypes.string.isRequired,
  collapseButtonLabel: PropTypes.string.isRequired,
  openMenuButtonLabel: PropTypes.string.isRequired,
  closeMenuButtonLabel: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired])
        .isRequired,
      title: PropTypes.string.isRequired,
      icon: PropTypes.func.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          url: PropTypes.string,
          id: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired])
            .isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default SideNav;
