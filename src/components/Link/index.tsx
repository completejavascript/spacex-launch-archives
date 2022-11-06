import { AnchorHTMLAttributes, forwardRef } from "react";

// utils
import { isExternalLink } from "../../utils/linkHelper";

// ----------------------------------------------------------------------------s

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const { href, children, ...rest } = props;

  return isExternalLink(href) ? (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
    >
      {children}
    </a>
  ) : (
    <a ref={ref} href={href} {...rest}>
      {children}
    </a>
  );
});

export default Link;
